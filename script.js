function enterSite(){

    const username = document.getElementById("loginUsername").value.trim();

    const password = document.getElementById("loginPassword").value.trim();

    if(username === "superadmin" && password === "superadmin"){

        window.location.href = "superadmin.html";

    }

    else if(username === "admin" && password === "admin"){

        window.location.href = "admin.html";

    }

    else if(username === "user" && password === "user"){

        window.location.href = "main.html";

    }

    else{

        alert("Invalid login credentials.");

    }

}

const heroImages = [

    "images/hero1.jpg",

    "images/hero2.jpg",

    "images/hero3.jpg"

];

let currentHero = 0;

function updateHeroCarousel(){

    const hero = document.getElementById("heroCarousel");

    const dots = document.querySelectorAll(".dot");

    if(hero){

        hero.src = heroImages[currentHero];

    }

    dots.forEach(dot => dot.classList.remove("active-dot"));

    if(dots[currentHero]){

        dots[currentHero].classList.add("active-dot");

    }

}

function nextHero(){

    currentHero++;

    if(currentHero >= heroImages.length){

        currentHero = 0;

    }

    updateHeroCarousel();

}

function prevHero(){

    currentHero--;

    if(currentHero < 0){

        currentHero = heroImages.length - 1;

    }

    updateHeroCarousel();

}

setInterval(function(){

    nextHero();

}, 3000);

function toggleReadMore(link){

    event.preventDefault();

    let card = link.closest(".news-row-info");

    let moreText = card.querySelector(".more-text");

    if(moreText.style.display === "block"){

        moreText.style.display = "none";

        link.textContent = "Read More";

    }else{

        moreText.style.display = "block";

        link.textContent = "Show Less";

    }

}

function showUpdatesTab(tab){

    const latest = document.getElementById("latestNews");

    const trending = document.getElementById("trendingTopics");

    const buttons = document.querySelectorAll(".updates-tabs button");

    buttons.forEach(button => {

        button.classList.remove("active-tab");

    });

    if(tab === "latest"){

        latest.style.display = "flex";

        trending.style.display = "none";

        buttons[0].classList.add("active-tab");

    }else{

        latest.style.display = "none";

        trending.style.display = "flex";

        buttons[1].classList.add("active-tab");

    }

}

function showQuizCategory(category){

    const cards = document.querySelectorAll(".full-quiz-card");

    const buttons = document.querySelectorAll(".updates-tabs button");

    buttons.forEach(button => {

        button.classList.remove("active-tab");

    });

    event.target.classList.add("active-tab");

    cards.forEach(card => {

        if(category === "all" || card.getAttribute("data-category") === category){

            card.style.display = "flex";

        }else{

            card.style.display = "none";

        }

    });

}

const exoQuiz = [

    {

        question:"Who is EXO’s leader?",

        choices:["Kai","Suho","Baekhyun","Chanyeol"],

        answer:"Suho"

    },

    {

        question:"Which EXO member is known as the ‘Dance Machine’?",

        choices:["D.O.","Kai","Xiumin","Chen"],

        answer:"Kai"

    },

    {

        question:"Which song includes the lyric ‘Cause you’re my lucky one’?",

        choices:["Growl","Love Shot","Lucky One","Tempo"],

        answer:"Lucky One"

    },

    {

        question:"Which EXO member is famous for acting roles?",

        choices:["D.O.","Sehun","Baekhyun","Lay"],

        answer:"D.O."

    },

    {

        question:"What year did EXO debut?",

        choices:["2010","2011","2012","2013"],

        answer:"2012"

    }

];

let currentQuestion = 0;

let score = 0;

let selectedAnswer = "";

function startQuiz(type){

    if(type !== "exo"){

        alert("This quiz is still under development.");

        return;

    }

    document.getElementById("quizModal").style.display = "flex";

    currentQuestion = 0;

    score = 0;

    loadQuestion();

}

function loadQuestion(){

    const data = exoQuiz[currentQuestion];

    document.getElementById("quizTitle").textContent = "EXO Trivia Challenge";

    document.getElementById("quizProgress").textContent = "Question " + (currentQuestion + 1) + " of " + exoQuiz.length;

    document.getElementById("quizQuestion").textContent = data.question;

    const choicesContainer = document.getElementById("quizChoices");

    choicesContainer.innerHTML = "";

    selectedAnswer = "";

    data.choices.forEach(choice => {

        const button = document.createElement("button");

        button.classList.add("quiz-choice-btn");

        button.textContent = choice;

        button.onclick = function(){

            document.querySelectorAll(".quiz-choice-btn").forEach(btn => {

                btn.classList.remove("selected-answer");

            });

            button.classList.add("selected-answer");

            selectedAnswer = choice;

        };

        choicesContainer.appendChild(button);

    });

}

function nextQuestion(){

    if(selectedAnswer === ""){

        alert("Please choose an answer first.");

        return;

    }

    if(selectedAnswer === exoQuiz[currentQuestion].answer){

        score++;

    }

    currentQuestion++;

    if(currentQuestion >= exoQuiz.length){

        showFinalScore();

    }else{

        loadQuestion();

    }

}

function showFinalScore(){

    document.getElementById("quizQuestion").textContent = "Quiz Completed!";

    document.getElementById("quizChoices").innerHTML = "";

    document.getElementById("quizProgress").textContent = "Final Score";

    document.getElementById("quizScoreText").innerHTML =

    "You scored <strong>" + score + "/" + exoQuiz.length + "</strong> in the EXO Trivia Challenge!";

}

function closeQuiz(){

    document.getElementById("quizModal").style.display = "none";

    document.getElementById("quizScoreText").innerHTML = "";

}

function openPostModal(){

    document.getElementById("postModal").style.display = "flex";

}

function closePostModal(){

    document.getElementById("postModal").style.display = "none";

}

function submitPost(){

    const title = document.getElementById("postTitle").value;

    const category = document.getElementById("postCategory").value;

    const message = document.getElementById("postMessage").value;

    const discussionList = document.getElementById("discussionList");

    if(title === "" || message === ""){

        alert("Please complete the title and message.");

        return;

    }

    const post = document.createElement("div");

    post.classList.add("discussion-row");

    post.innerHTML = `

        <div class="discussion-topic">

            <div class="avatar-circle">✨</div>

            <div>

                <h3>${title}</h3>

                <p>By You • ${category}</p>

                <div class="discussion-actions">

                    <button onclick="deletePost(this)">Delete</button>

                </div>

            </div>

        </div>

        <span>0</span>

        <span>Just now</span>

    `;

    discussionList.prepend(post);

    document.getElementById("postTitle").value = "";

    document.getElementById("postMessage").value = "";

    closePostModal();

}

function searchDiscussions(){

    const searchInput = document.getElementById("discussionSearch").value.toLowerCase();

    const discussions = document.querySelectorAll(".discussion-row");

    discussions.forEach(row => {

        const title = row.querySelector("h3").textContent.toLowerCase();

        if(title.includes(searchInput)){

            row.style.display = "grid";

        }else{

            row.style.display = "none";

        }

    });

}

function deletePost(button){

    const post = button.closest(".discussion-row");

    post.remove();

}

function filterMerch(type){

    const cards = document.querySelectorAll(".merch-product-card");

    const buttons = document.querySelectorAll(".updates-tabs button");

    buttons.forEach(button => {

        button.classList.remove("active-tab");

    });

    event.target.classList.add("active-tab");

    cards.forEach(card => {

        if(type === "all" || card.getAttribute("data-type") === type){

            card.style.display = "flex";

        }else{

            card.style.display = "none";

        }

    });

}

function showMerchDetails(productName){

    const popup = document.getElementById("merchPopup");

    const text = document.getElementById("merchPopupText");

    text.innerHTML = "<strong>" + productName + "</strong><br>This item is available for browsing only. Checkout and payment features are not included in this prototype.";

    popup.style.display = "flex";

}

function closeMerchPopup(){

    document.getElementById("merchPopup").style.display = "none";

}

function showGroupInfo(group){

    const box = document.getElementById("groupInfoBox");

    const groups = {

        snsd:{

            name:"Girls' Generation",

            info:"Girls' Generation is a legendary 2nd generation girl group known for shaping K-pop history with iconic songs and performances.",

            links:`

                <a href="#">Instagram</a>

                <a href="#">X</a>

                <a href="#">YouTube</a>

            `

        },

        pm:{

            name:"2PM",

            info:"2PM is a 2nd generation boy group known for powerful performances, mature concepts, and strong stage presence.",

            links:`

                <a href="#">Instagram</a>

                <a href="#">X</a>

                <a href="#">YouTube</a>

            `

        },

        svt:{

            name:"SEVENTEEN",

            info:"SEVENTEEN is a self-producing group known for synchronized performances, strong vocals, and creative teamwork.",

            links:`

                <a href="#">Instagram</a>

                <a href="#">X</a>

                <a href="#">YouTube</a>

            `

        },

        nctdream:{

            name:"NCT Dream",

            info:"NCT Dream is a youthful and energetic unit known for bright concepts, strong performances, and global popularity.",

            links:`

                <a href="#">Instagram</a>

                <a href="#">X</a>

                <a href="#">YouTube</a>

            `

        },

        izna:{

            name:"IZNA",

            info:"IZNA is a rising girl group gaining attention for their strong performances, visuals, and growing international fandom support.",

            links:`

                <a href="https://www.instagram.com/izna_offcl/" target="_blank">Instagram</a>

                <a href="https://x.com/izna_offcl" target="_blank">X</a>

                <a href="https://www.youtube.com/@izna_offcl" target="_blank">YouTube</a>

            `

        },

        babymonster:{

            name:"BABYMONSTER",

            info:"BABYMONSTER is a new generation girl group known for powerful vocals, rap, and bold performances.",

            links:`

                <a href="#">Instagram</a>

                <a href="#">X</a>

                <a href="#">YouTube</a>

            `

        }

    };

    const selected = groups[group];

    box.innerHTML = `

        <h3>${selected.name}</h3>

        <p>${selected.info}</p>

        <div class="group-sns-links">

            ${selected.links}

        </div>

    `;

}

function showProfileTab(tab){

    const overview = document.getElementById("overviewSection");

    const edit = document.getElementById("editProfileSection");

    const tabs = document.querySelectorAll(".profile-tab");

    tabs.forEach(tabItem => {

        tabItem.classList.remove("active-profile-tab");

    });

    if(tab === "overview"){

        overview.style.display = "block";

        edit.style.display = "none";

        tabs[0].classList.add("active-profile-tab");

    }else{

        overview.style.display = "none";

        edit.style.display = "block";

        tabs[1].classList.add("active-profile-tab");

    }

}

function saveProfileChanges(){

    const name = document.getElementById("editName").value;

    const bioLine = document.getElementById("editBioLine").value;

    const about = document.getElementById("editAbout").value;

    document.getElementById("profileName").textContent = name;

    document.getElementById("profileBioLine").textContent = bioLine;

    document.getElementById("profileAbout").textContent = about;

    document.getElementById("profileSaveMessage").textContent = "Profile updated successfully!";

}

function showAdminSection(sectionId, clickedItem){

    const sections = document.querySelectorAll(".admin-section");

    const items = document.querySelectorAll(".admin-sidebar li");

    sections.forEach(section => {

        section.classList.remove("active-admin-section");

    });

    items.forEach(item => {

        item.classList.remove("active-admin");

    });

    document.getElementById(sectionId).classList.add("active-admin-section");

    clickedItem.classList.add("active-admin");

}

function addAdminRow(listId, text){

    const list = document.getElementById(listId);

    const item = document.createElement("p");

    item.innerHTML = `

        ${text}

        <button class="admin-mini-btn" onclick="editAdminItem(this)">Edit</button>

        <button class="admin-mini-btn" onclick="deleteAdminItem(this)">Delete</button>

    `;

    list.appendChild(item);

    addActivity("New item added: " + text);

}

function deleteAdminItem(button){

    const item = button.parentElement;

    addActivity("Item deleted: " + item.childNodes[0].textContent.trim());

    item.remove();

}

function editAdminItem(button){

    const item = button.parentElement;

    const oldText = item.childNodes[0].textContent.trim();

    const newText = prompt("Edit item:", oldText);

    if(newText){

        item.childNodes[0].textContent = newText + " ";

        addActivity("Item edited: " + newText);

    }

}

function addActivity(text){

    const activity = document.getElementById("recentActivity");

    if(activity){

        const p = document.createElement("p");

        p.textContent = text + " • Just now";

        activity.prepend(p);

    }

}

function addUser(){

    addAdminRow("userList", "new_user • newuser@gmail.com • User • Active");

}

function addAdmin(){

    addAdminRow("adminList", "new_admin • admin@gmail.com • Admin");

}



