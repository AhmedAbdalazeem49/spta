import codecs

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_check = """        $existing = ConferenceRegistration::where('user_id', $user->id)
            ->whereIn('status', ['paid', 'pending'])
            ->first();

        if ($existing) {
            return ApiResponse::error('لقد قمت بالتسجيل مسبقاً في هذا المؤتمر.', 409);
        }"""

new_check = """        $existing = ConferenceRegistration::where('user_id', $user->id)
            ->whereIn('status', ['paid', 'pending'])
            ->first();

        if ($existing) {
            if ($existing->status === 'paid' && !empty($request->input('workshops', []))) {
                return $this->processAddon($request, $existing, $user);
            }
            return ApiResponse::error('لقد قمت بالتسجيل مسبقاً في هذا المؤتمر.', 409);
        }"""

if old_check in content:
    content = content.replace(old_check, new_check)
    
    # Add processAddon method at the end of the class (before the last brace)
    addon_method = """

    private function processAddon(Request $request, $registration, $user)
    {
        $newWorkshops = $request->input('workshops', []);
        $existingWorkshops = $registration->selected_workshops ?? [];
        if (!is_array($existingWorkshops)) {
            $existingWorkshops = json_decode($existingWorkshops, true) ?? [];
        }

        $allWorkshops = array_unique(array_merge($existingWorkshops, $newWorkshops));

        $morningCount = 0;
        $eveningCount = 0;
        foreach ($allWorkshops as $w) {
            if (!isset($this->workshops[$w])) continue;
            if ($this->workshops[$w]['time'] === 'morning') $morningCount++;
            if ($this->workshops[$w]['time'] === 'evening') $eveningCount++;
        }

        if ($morningCount > 1 || $eveningCount > 1) {
            return ApiResponse::error('لا يمكنك اختيار أكثر من ورشة عمل واحدة في نفس الوقت (صباحية ومسائية).', 400);
        }

        $workshopsToCharge = array_values(array_diff($newWorkshops, $existingWorkshops));
        if (empty($workshopsToCharge)) {
             return ApiResponse::error('لقد قمت باختيار هذه الورش مسبقاً.', 400);
        }

        // Calculate price
        $membership = $user->activeMembership()->first();
        $isStudent = empty($user->classification_number) || $user->role === 'student' || $user->role === 'intern' || ($membership && in_array($membership->membership_type, ['student', 'intern']));
        $workshopPricePerUnit = $isStudent ? 200 : 300;
        
        $totalPrice = count($workshopsToCharge) * $workshopPricePerUnit;

        if ($totalPrice <= 0) {
            $registration->selected_workshops = $allWorkshops;
            $registration->save();
            return ApiResponse::success('تمت إضافة الورش بنجاح', $registration);
        }

        $transaction = PaymentTransaction::create([
            'user_id' => $user->id,
            'type' => 'conference_addon',
            'reference_id' => $registration->id . ':' . implode(',', $workshopsToCharge),
            'amount' => $totalPrice,
            'description' => "Conference 2026 Addon: " . implode(', ', $workshopsToCharge),
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
        ]);

        $paymentUrl = route('payment.page', [
            'transactionId' => $transaction->id,
            'paymentMethod' => $request->payment_method,
        ]);

        return ApiResponse::success('Redirecting to payment for add-ons', [
            'payment_url' => $paymentUrl,
            'transaction_id' => $transaction->id
        ]);
    }
}
"""
    content = content.replace("}\n", addon_method)
    
    # We replaced the last closing brace with the method + closing brace. But wait, `content.replace("}\n", addon_method)` might replace multiple closing braces! Let's be safer.
    content = content[:content.rfind('}')] + addon_method
    
    with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'w', 'utf-8') as f:
        f.write(content)
    print("Updated ConferenceRegistrationController successfully!")
else:
    print("old_check not found!")
