import codecs

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_eval = '''        $evaluation = ConferenceEvaluation::updateOrCreate(
            ['user_id' => $user->id],
            $request->only(['organization_score', 'content_score', 'speakers_score', 'venue_score', 'recommendation_score', 'feedback'])
        );

        return ApiResponse::success('تم تقييم المؤتمر بنجاح', $evaluation);'''

new_eval = '''        $evaluation = ConferenceEvaluation::updateOrCreate(
            ['user_id' => $user->id],
            $request->only(['organization_score', 'content_score', 'speakers_score', 'venue_score', 'recommendation_score', 'feedback'])
        );

        // Mark conference registration as reviewed
        $registration = ConferenceRegistration::where('user_id', $user->id)->first();
        if ($registration) {
            $registration->has_reviewed = true;
            $registration->save();
        }

        return ApiResponse::success('تم تقييم المؤتمر بنجاح', $evaluation);'''

content = content.replace(old_eval, new_eval)

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'w', 'utf-8') as f:
    f.write(content)
print("Updated backend to set has_reviewed")
