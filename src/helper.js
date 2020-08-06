const faker = require("faker");

export function getDummyUserData(len) {
    console.time("MyTimer");
    window.timerStart = new Date();
    const timerStartNode = document.createElement("p");
    timerStartNode.textContent = 'Process start...';
    document.getElementById('timer').appendChild(timerStartNode);

    let process = true;
    let userData = createDummyUsers(len);

    if (new Set(userData).size !== parseInt(len)) {
        const confirm = window.confirm(
            "생성된 아이디들 중에 중복이 존재합니다. 계속 진행할까요?"
        );
        if (!confirm) {
            process = false;
        }
    }

    if (process) {
        return createDummyUserData(len, userData);
    } else {
        window.alert("페이지를 새로고침합니다. 다시 시도해주세요");
        window.location.reload();
    }
}

function createDummyUserData(len, userData) {
    let users = [];

    const relationshipData = createRandomRelationship(userData.length);

    for (let i = 0; i < len; i++) {
        let user = {};
        user.user_id = userData[i];
        user.userReadable = getRandomUserReadable(userData, i);
        user.userWritable = getRandomUserWritable(
            randomStr(["male", "female"])
        );
        user.userReadableMatching = getRandomUserReadableMatching(
            userData,
            i,
            relationshipData,
        );
        users.push(user);
    }
    // console.log(users[0].userReadableMatching.matched_users.length);
    // console.log(users[100].userReadableMatching.matched_users.length);
    // console.log(users[200].userReadableMatching.matched_users.length);
    // console.log(users[300].userReadableMatching.matched_users.length);
    // console.log(users[userData.length-1].userReadableMatching.matched_users.length);
    return users;
}

function createDummyUsers(len) {
    let userData = [];
    for (let j = 0; j < len; j++) {
        const randomUser = stringGen(28);
        userData.push(randomUser);
    }

    console.timeLog("MyTimer", "create dummy user IDs done");
    const timerIDdone = new Date();
    const abstract = (timerIDdone - window.timerStart);
    const timerIDdoneNode = document.createElement("p");
    timerIDdoneNode.textContent = `Create dummy user IDs done in ${abstract}ms`;
    document.getElementById('timer').appendChild(timerIDdoneNode);
    return userData;
}

function getRandomUserReadable(userData, meIdIdx) {
    let userReadableSkeleton = {};
    userReadableSkeleton.user_email = faker.internet.email();
    userReadableSkeleton.user_name = faker.name.findName();
    userReadableSkeleton.account_status = randomStr(["active", "deactivated"]);
    userReadableSkeleton.account_creation_timestamp = randomNumber(
        1580000000000,
        1600000000000
    );
    userReadableSkeleton.last_login_timestamp = randomNumber(
        1580000000000,
        1600000000000
    );
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
    userReadableSkeleton.tier = randomStr([1, 2, 3, 4, 5, 6, 7]);

    //store
    userReadableSkeleton.store = {};

    //rating
    userReadableSkeleton.ratings = {};
    userReadableSkeleton.ratings.average_rating = randomNumber(0, 100) / 10;
    userReadableSkeleton.ratings.ratings_given_count = randomNumber(0, 15);
    userReadableSkeleton.ratings.ratings_received = [];

    let ratingGivenUserUniqueCheck = [];
    ratingGivenUserUniqueCheck.push(meIdIdx);
    for (let i = 0; i < 10; i++) {
        let dataSet = {};
        let uniqueIdx = getUniqueIdx(
            ratingGivenUserUniqueCheck,
            randomNumber(0, userData.length),
            userData
        );
        dataSet.ratings_given_user = userData[uniqueIdx];
        dataSet.event_timestamp = randomNumber(1580000000000, 1600000000000);
        dataSet.rating = randomNumber(0, 100) / 10;
        userReadableSkeleton.ratings.ratings_received.push(dataSet);
        ratingGivenUserUniqueCheck.push(uniqueIdx);
    }

    //verifications
    userReadableSkeleton.verifications = {};

    //-- appearances
    userReadableSkeleton.verifications.appearances = {};
    userReadableSkeleton.verifications.appearances.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.appearances.images = [];

    //-- education
    userReadableSkeleton.verifications.education = {};
    userReadableSkeleton.verifications.education.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.education.images = [];

    //-- profession
    userReadableSkeleton.verifications.profession = {};
    userReadableSkeleton.verifications.profession.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.profession.images = [];

    //-- wages
    userReadableSkeleton.verifications.wages = {};
    userReadableSkeleton.verifications.wages.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.wages.images = [];

    //-- personal_asset
    userReadableSkeleton.verifications.personal_asset = {};
    userReadableSkeleton.verifications.personal_asset.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.personal_asset.images = [];

    //-- company
    userReadableSkeleton.verifications.company = {};
    userReadableSkeleton.verifications.company.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.company.images = [];

    //-- vehicle
    userReadableSkeleton.verifications.vehicle = {};
    userReadableSkeleton.verifications.vehicle.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.vehicle.images = [];

    //-- family_asset
    userReadableSkeleton.verifications.family_asset = {};
    userReadableSkeleton.verifications.family_asset.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.family_asset.images = [];

    //-- height
    userReadableSkeleton.verifications.height = {};
    userReadableSkeleton.verifications.height.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.height.images = [];

    //-- verified_account
    userReadableSkeleton.verifications.verified_account = {};
    userReadableSkeleton.verifications.verified_account.tier = randomNumber(1, 7);
    userReadableSkeleton.verifications.verified_account.images = [];

    //-- family_job_title
    userReadableSkeleton.verifications.family_job_title = {};
    userReadableSkeleton.verifications.family_job_title.tier = randomNumber(1, 7);
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
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        randomNumber(1, 5)
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
    userWritableSkeleton.characteristics = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        randomNumber(1, 5)
    );
    userWritableSkeleton.my_title = faker.lorem.sentence();
    userWritableSkeleton.nickname = faker.lorem.word();
    userWritableSkeleton.profession = randomStr([
        "dummy",
        "profession",
        "data",
    ]);
    userWritableSkeleton.relationship_style = randomStr(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        randomNumber(1, 5)
    );
    userWritableSkeleton.religion = randomStr([
        "none",
        "christian",
        "catholic",
        "buddhist",
    ]);
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
    userWritableSkeleton.preferences.default_preferences.religion = randomStr([
        "none",
        "christian",
        "catholic",
        "buddhist",
    ]);

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
        randomNumber(1, 5)
    );

    return userWritableSkeleton;
}

function getRandomUserReadableMatching(userData, meIdIdx, relationshipData) {
    let userReadableMatchingSkeleton = {};
    let uniqueCheckForm = [];
    uniqueCheckForm.push(meIdIdx);

    const myData = relationshipData[meIdIdx];
    userReadableMatchingSkeleton.acted_users = [];
    userReadableMatchingSkeleton.liked_users = [];
    userReadableMatchingSkeleton.matched_users = [];

    if (myData) {
        const matchDataIdx = Math.floor(myData.length * 0.8);
        const likedDataIdx = Math.floor(myData.length * 0.9);
        const matchData = myData.slice(0, matchDataIdx);
        const likedData = myData.slice(matchDataIdx, likedDataIdx);
        const actedData = myData.slice(likedDataIdx);

        actedData.forEach((dataArr) => {
            if (dataArr[1] === meIdIdx) {
                userReadableMatchingSkeleton.acted_users.push({
                    user_id: userData[dataArr[0]],
                    last_message: "",
                    last_message_ts: "",
                    unread_count: "",
                    profile_pic_path: "",
                    matched_user_tier: "",
                    event_timestamp: dataArr[2],
                });
            }
        });

        likedData.forEach((dataArr) => {
            if (dataArr[0] === meIdIdx) {
                userReadableMatchingSkeleton.liked_users.push({
                    user_id: userData[dataArr[1]],
                    last_message: "",
                    last_message_ts: "",
                    unread_count: "",
                    profile_pic_path: "",
                    matched_user_tier: "",
                    event_timestamp: dataArr[2],
                });
            }
        });

        matchData.forEach((dataArr) => {
            if (dataArr[0] === meIdIdx) {
                userReadableMatchingSkeleton.matched_users.push({
                    user_id: userData[dataArr[1]],
                    last_message: "",
                    last_message_ts: "",
                    unread_count: "",
                    profile_pic_path: "",
                    matched_user_tier: "",
                    event_timestamp: dataArr[2],
                });
            }
            if (dataArr[1] === meIdIdx) {
                userReadableMatchingSkeleton.matched_users.push({
                    user_id: userData[dataArr[0]],
                    last_message: "",
                    last_message_ts: "",
                    unread_count: "",
                    profile_pic_path: "",
                    matched_user_tier: "",
                    event_timestamp: dataArr[2],
                });
            }
        });
    }

    userReadableMatchingSkeleton.rejected_users = [];
    let rejectedUserRedundancyCheck = [...uniqueCheckForm];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        let uniqueIdx = getUniqueIdx(
            rejectedUserRedundancyCheck,
            randomNumber(0, userData.length),
            userData
        );
        userReadableMatchingSkeleton.rejected_users.push({
            user_id: userData[uniqueIdx],
            is_premium_like: faker.random.boolean(),
            message: faker.lorem.sentence(),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
        rejectedUserRedundancyCheck.push(uniqueIdx);
    }

    userReadableMatchingSkeleton.blocked_users = [];
    let blockedUserRedundancyCheck = [...uniqueCheckForm];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        let uniqueIdx = getUniqueIdx(
            blockedUserRedundancyCheck,
            randomNumber(0, userData.length),
            userData
        );
        userReadableMatchingSkeleton.blocked_users.push({
            user_id: userData[randomNumber(0, userData.length)],
            reason: randomStr(["fake_account", "inappropriate_language"]),
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
        blockedUserRedundancyCheck.push(uniqueIdx);
    }

    userReadableMatchingSkeleton.recommended_users = [];
    let recommendedUserRedundancyCheck = [...uniqueCheckForm];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        let uniqueIdx = getUniqueIdx(
            recommendedUserRedundancyCheck,
            randomNumber(0, userData.length),
            userData
        );
        userReadableMatchingSkeleton.recommended_users.push(
            userData[uniqueIdx]
        );
        recommendedUserRedundancyCheck.push(uniqueIdx);
    }

    userReadableMatchingSkeleton.shown_users = [];
    let shownUserRedundancyCheck = [...uniqueCheckForm];
    for (let i = 0; i < randomNumber(0, randomNumber(1, 5)); i++) {
        let uniqueIdx = getUniqueIdx(
            shownUserRedundancyCheck,
            randomNumber(0, userData.length),
            userData
        );
        userReadableMatchingSkeleton.shown_users.push({
            user_id: userData[uniqueIdx],
            event_timestamp: randomNumber(1580000000000, 1600000000000),
        });
        shownUserRedundancyCheck.push(uniqueIdx);
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

function getUniqueIdx(arr, idx, userData) {
    if (arr.indexOf(idx) === -1) {
        return idx;
    }
    return getUniqueIdx(arr, randomNumber(0, userData.length), userData);
}

function createRandomRelationship(len) {
    let protoResult = [];
    const arrLen = len * 50;
    const min = Math.floor(len * 0.5);
    for (let i = 0; i < arrLen; i++) {
        protoResult.push(
            JSON.stringify([
                randomNumber(0, min),
                randomNumber(min, len),
                randomNumber(1580000000000, 1600000000000),
            ])
        );
    }

    const setResult = new Set(protoResult);
    const clone = [...setResult];
    const result = clone.map((e) => JSON.parse(e));
    const sortedLen = result.sort((a, b) => a[0] - b[0]);
    let hashMap = [];
    sortedLen.forEach((e, i) => {
        if (i % 2 === 0) {
            if (!hashMap[e[0]]) {
                hashMap[e[0]] = [];
                hashMap[e[0]].push(e);
            } else {
                hashMap[e[0]].push(e);
            }
        } else {
            if (!hashMap[e[1]]) {
                hashMap[e[1]] = [];
                hashMap[e[1]].push(e);
            } else {
                hashMap[e[1]].push(e);
            }
        }
    });
    console.timeLog("MyTimer", "Ready to return relationship Hashmap");
    const timerHashmapDone = new Date();
    const abstract = (timerHashmapDone - window.timerStart);
    const timerHashmapDoneNode = document.createElement("p");
    timerHashmapDoneNode.textContent = `Create relationships Hashmap done in ${abstract}ms`;
    document.getElementById('timer').appendChild(timerHashmapDoneNode);
    return hashMap;
}
