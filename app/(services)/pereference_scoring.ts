interface PreferenceScore {
    tag_name: String, 
    score: number
}

const ScoreMapping = {
    CLICK: 1,
    SAVE: 5,
    CLAIM: 10
} as const;

export function perferecneScoring(selected_tags: String[], action_made: keyof typeof ScoreMapping): PreferenceScore[] {
    
    let preferences: PreferenceScore[] = [];

    for (let tag of selected_tags) {
        const temp: PreferenceScore = {
            tag_name: tag, 
            score: ScoreMapping[action_made]
        };
        preferences.push(temp);
    }


    return preferences;
}