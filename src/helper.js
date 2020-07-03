const faker = require("faker");

export function getDummyUserData(len) {
    let users = [];
    for (let i = 0; i < len; i++) {
        let user = {};
        user.user_id = stringGen(28);
        user.userReadable = getRandomUserReadable();
        user.userWritable = getRandomUserWritable(
            randomStr(["male", "female"])
        );
        user.userReadableMatching = getRandomUserReadableMatching();
        users.push(user);
    }
    return users;
}

function getRandomUserReadable() {
    let userReadableSkeleton = {};
    userReadableSkeleton.user_email = faker.internet.email();
    userReadableSkeleton.user_name = faker.name.findName();
    userReadableSkeleton.account_status = randomStr(["active", "deactivated"]);
    userReadableSkeleton.account_creation_timestamp = randomNumber(1580000000000, 1600000000000);
    userReadableSkeleton.last_login_timestamp = randomNumber(1580000000000, 1600000000000);
    userReadableSkeleton.date_of_birth = faker.date
        .between("1981-01-01", "2001-12-31")
        .toISOString()
        .slice(0, 10);
    userReadableSkeleton.subscription_status = faker.random.boolean();
    userReadableSkeleton.subscription_ending_time = faker.date
        .between("2020-01-01", "2030-12-31")
        .toISOString()
        .slice(0, 10);
    userReadableSkeleton.invitee_code = stringGen(6);
    userReadableSkeleton.device_OS = randomStr(["Android", "iOS"]);
    userReadableSkeleton.tier = randomStr([0, 1, 2, 3, 4, 5, 6, 7]);

    //store
    userReadableSkeleton.store = {};

    //rating
    userReadableSkeleton.ratings = {};
    userReadableSkeleton.ratings.average_rating = randomNumber(0, 100) / 10;
    userReadableSkeleton.ratings.ratings_given_count = randomNumber(0, 15);
    userReadableSkeleton.ratings.ratings_received = [];
    const randomLoopNumber = randomNumber(0, 10);
    for (let i = 0; i < randomLoopNumber; i++) {
        let dataSet = {};
        dataSet.ratings_given_user = stringGen(28);
        dataSet.event_timestamp = randomNumber(1580000000000, 1600000000000);
        dataSet.rating = randomNumber(0, 100) / 10;
        userReadableSkeleton.ratings.ratings_received.push(dataSet);
    }

    //verifications
    userReadableSkeleton.verifications = {};

    //-- appearances
    userReadableSkeleton.verifications.appearances = {};
    userReadableSkeleton.verifications.appearances.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.appearances.images = [];

    //-- education
    userReadableSkeleton.verifications.education = {};
    userReadableSkeleton.verifications.education.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.education.images = [];

    //-- profession
    userReadableSkeleton.verifications.profession = {};
    userReadableSkeleton.verifications.profession.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.profession.images = [];

    //-- wages
    userReadableSkeleton.verifications.wages = {};
    userReadableSkeleton.verifications.wages.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.wages.images = [];

    //-- personal_asset
    userReadableSkeleton.verifications.personal_asset = {};
    userReadableSkeleton.verifications.personal_asset.tier = randomNumber(
        0,
        10
    );
    userReadableSkeleton.verifications.personal_asset.images = [];

    //-- company
    userReadableSkeleton.verifications.company = {};
    userReadableSkeleton.verifications.company.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.company.images = [];

    //-- vehicle
    userReadableSkeleton.verifications.vehicle = {};
    userReadableSkeleton.verifications.vehicle.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.vehicle.images = [];

    //-- family_asset
    userReadableSkeleton.verifications.family_asset = {};
    userReadableSkeleton.verifications.family_asset.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.family_asset.images = [];

    //-- height
    userReadableSkeleton.verifications.height = {};
    userReadableSkeleton.verifications.height.tier = randomNumber(0, 10);
    userReadableSkeleton.verifications.height.images = [];

    //-- verified_account
    userReadableSkeleton.verifications.verified_account = {};
    userReadableSkeleton.verifications.verified_account.tier = randomNumber(
        0,
        10
    );
    userReadableSkeleton.verifications.verified_account.images = [];

    //-- family_job_title
    userReadableSkeleton.verifications.family_job_title = {};
    userReadableSkeleton.verifications.family_job_title.tier = randomNumber(
        0,
        10
    );
    userReadableSkeleton.verifications.family_job_title.images = [];

    return userReadableSkeleton;
}

function getRandomUserWritable(gender) {
    let userWritableSkeleton = {};
    userWritableSkeleton.is_male = gender === "male" ? true : false;
    userWritableSkeleton.blood_type = randomStr(["A", "B", "O", "AB"]);
    if (gender === "male") {
        userWritableSkeleton.body_shape = randomStr(["muscular", "skinny"]);
    } else {
        userWritableSkeleton.body_shape = randomStr(["muscular", "skinny"]);
    }
    userWritableSkeleton.charm = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        randomNumber(1, 13)
    );
    userWritableSkeleton.city = randomStr([
        "seoul",
        "daejeon",
        "daegu",
        "gwangju",
        "incheon",
        "ulsan",
        "sejong",
        "busan",
    ]);
    userWritableSkeleton.district = "";
    if (userWritableSkeleton.city === "seoul") {
        userWritableSkeleton.district = randomStr([
            "Jongno",
            "Jung",
            "Yongsan",
            "Seongdong",
            "Gwangjin",
            "Dongdaemun",
            "Jungnang",
            "Seongbuk",
            "Gangbuk",
            "Dobong",
            "Nowon",
            "Eunpyeong",
            "Seodaemun",
            "Mapo",
            "Yangcheon",
            "Gangseo",
            "Guro",
            "Geumcheon",
            "Yeongdeungpo",
            "Dongjak",
            "Gwanak",
            "Seocho",
            "Gangnam",
            "Songpa",
            "Gangdong",
        ]);
    }
    userWritableSkeleton.drink = randomStr([0, 1, 2, 3, 4]);
    userWritableSkeleton.highest_education = randomStr([
        "graduate",
        "undergraduate",
        "college",
    ]);
    userWritableSkeleton.job_category = randomStr(["dummy", "job", "data"]);
    userWritableSkeleton.mind = randomStr(["dummy", "mind", "data"]);
    userWritableSkeleton.my_title = faker.lorem.sentence();
    userWritableSkeleton.nickname = faker.lorem.word();
    userWritableSkeleton.profession = randomStr([
        "dummy",
        "profession",
        "data",
    ]);
    userWritableSkeleton.relationship_style = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        randomNumber(1, 12)
    );
    userWritableSkeleton.religion = randomStr(
        ["none", "christian", "catholic", "muslim", "buddhist", "hindoo"],
        randomNumber(1, 6)
    );
    userWritableSkeleton.smoker = randomStr([0, 1, 2, 3]);
    if (gender === "male") {
        userWritableSkeleton.height = randomNumber(165, 195);
    } else {
        userWritableSkeleton.height = randomNumber(148, 178);
    }
    userWritableSkeleton.university = randomStr([
        "Massachusetts Institute of Technology (MIT)",
        "Stanford University",
        "Harvard University",
        "University of Oxford",
        "California Institute of Technology (Caltech)",
        "ETH Zurich - Swiss Federal Institute of Technology",
        "University of Cambridge",
        "Imperial College London",
        "University of Chicago",
        "Nanyang Technological University, Singapore (NTU)",
        "National University of Singapore (NUS)",
        "Princeton University",
        "Cornell University",
        "University of Pennsylvania",
        "Tsinghua University",
        "Yale University",
        "Columbia University",
        "The University of Edinburgh",
        "University of Michigan-Ann Arbor",
        "Peking University",
        "The University of Tokyo",
        "Johns Hopkins University",
        "Duke University",
    ]);
    userWritableSkeleton.want = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        randomNumber(1, 12)
    );

    //preferences
    userWritableSkeleton.preferences = {};

    //--default_preferences
    userWritableSkeleton.preferences.default_preferences = {};
    userWritableSkeleton.preferences.default_preferences.age_range = {};
    userWritableSkeleton.preferences.default_preferences.age_range.min = randomNumber(
        20,
        40
    );
    userWritableSkeleton.preferences.default_preferences.age_range.max = randomNumber(
        userWritableSkeleton.preferences.default_preferences.age_range.min,
        40
    );
    userWritableSkeleton.preferences.default_preferences.location = randomStr([
        "seoul",
        "daejeon",
        "daegu",
        "gwangju",
        "incheon",
        "ulsan",
        "sejong",
        "busan",
    ]);
    userWritableSkeleton.preferences.default_preferences.religion = randomStr(
        ["none", "christian", "catholic", "muslim", "buddhist", "hindoo"],
        randomNumber(1, 6)
    );

    //--purchased_preferences
    userWritableSkeleton.preferences.purchased_preferences = {};
    userWritableSkeleton.preferences.purchased_preferences.height = {};
    userWritableSkeleton.preferences.purchased_preferences.height.purchased = faker.random.boolean();
    if (gender !== "male") {
        userWritableSkeleton.preferences.purchased_preferences.height.min = randomNumber(
            165,
            195
        );
        userWritableSkeleton.preferences.purchased_preferences.height.max = randomNumber(
            userWritableSkeleton.preferences.purchased_preferences.height.min,
            195
        );
    } else {
        userWritableSkeleton.preferences.purchased_preferences.height.min = randomNumber(
            148,
            178
        );
        userWritableSkeleton.preferences.purchased_preferences.height.max = randomNumber(
            userWritableSkeleton.preferences.purchased_preferences.height.min,
            178
        );
    }
    userWritableSkeleton.preferences.purchased_preferences.education = {};
    userWritableSkeleton.preferences.purchased_preferences.education.purchased = faker.random.boolean();
    userWritableSkeleton.preferences.purchased_preferences.education.value = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7]
    );
    userWritableSkeleton.preferences.purchased_preferences.drinking = {};
    userWritableSkeleton.preferences.purchased_preferences.drinking.purchased = faker.random.boolean();
    userWritableSkeleton.preferences.purchased_preferences.drinking.value = randomStr(
        [0, 1, 2, 3, 4]
    );
    userWritableSkeleton.preferences.purchased_preferences.smoking = {};
    userWritableSkeleton.preferences.purchased_preferences.smoking.purchased = faker.random.boolean();
    userWritableSkeleton.preferences.purchased_preferences.drinking.value = randomStr(
        [0, 1, 2, 3, 4]
    );
    userWritableSkeleton.preferences.purchased_preferences.body_type = {};
    userWritableSkeleton.preferences.purchased_preferences.body_type.purchased = faker.random.boolean();
    userWritableSkeleton.preferences.purchased_preferences.body_type.body_type_list = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        randomNumber(1, 12)
    );

    return userWritableSkeleton;
}

function getRandomUserReadableMatching() {
    let userReadableMatchingSkeleton = {};

    userReadableMatchingSkeleton.acted_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.acted_users.push({
            user_id: stringGen(28),
            is_premium_like: faker.random.boolean(),
            message: faker.lorem.sentence(),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
    }

    userReadableMatchingSkeleton.liked_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.liked_users.push({
            user_id: stringGen(28),
            is_premium_like: faker.random.boolean(),
            message: faker.lorem.sentence(),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
    }

    userReadableMatchingSkeleton.rejected_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.rejected_users.push({
            user_id: stringGen(28),
            is_premium_like: faker.random.boolean(),
            message: faker.lorem.sentence(),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
    }

    userReadableMatchingSkeleton.blocked_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.blocked_users.push({
            user_id: stringGen(28),
            reason: randomStr(["fake_account", "inappropriate_language"]),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
    }

    userReadableMatchingSkeleton.recommended_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.recommended_users.push(stringGen(28));
    }

    userReadableMatchingSkeleton.shown_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.shown_users.push({
            user_id: stringGen(28),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
    }

    userReadableMatchingSkeleton.matched_users = [];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        userReadableMatchingSkeleton.matched_users.push({
            user_id: stringGen(28),
            last_message: "",
            last_message_ts: "",
            unread_count: "",
            profile_pic_path: "",
            matched_user_tier: "",
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
    }

    return userReadableMatchingSkeleton;
}

function randomStr(strArr, amount = 1) {
    const result = strArr
        .sort(() => Math.random() - Math.random())
        .slice(0, amount);
    return amount === 1 ? result[0] : result;
}

function stringGen(len) {
    let text = "";
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP0123456789";
    for (let i = 0; i < len; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
