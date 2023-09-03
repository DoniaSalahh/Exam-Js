
let data=document.getElementById('data');
let Search=document.getElementById('searchinput');

searchbyname("");


function opennav(){
    $(".nav-menu").animate({left: 0}, 500);
    $(".close-open").removeClass("fa-align-justify");
    $(".close-open").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $('.nav-menu .menu .links ul li').eq(i).animate({top: 0}, (i + 5) * 100)
    }
}
function closenav(){
    let Width = $(".nav-menu .menu").outerWidth();
    $(".nav-menu").animate({left: -Width}, 500);
    $(".close-open").removeClass("fa-x");
    $(".close-open").addClass("fa-align-justify");
    $('.nav-menu .menu .links ul li').animate({top: 300}, 500);
}


closenav();

let left=true;
$('.nav-menu i.close-open').click(()=>{
    if(left){
        opennav();
        left=false;
    }
    else{
        closenav();
        left=true;
    }
})


// anther solution to close navbar

// $(".nav-menu i.close-open").click(() => {
//     if ($(".nav-menu").css("left") == "0px") {
//         closenav();
//     } else {
//         opennav();
//     }
// })




// show search inputs


function showinputsearch(){
    Search.innerHTML=`
    <div class="row py-4 ms-5" id="row">
            <div class="col-md-6 mb-3">
                <input type="text" onkeyup="searchbyname(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name">
            </div>
            <div class="col-md-6 ">
                <input type="text"  onkeyup="searchbyletter(this.value)" class="form-control  bg-transparent text-white" placeholder="Search By First Letter" >
            </div>
        </div>
    `
}


async function searchbyname(name){
    data.innerHTML=" ";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    apiresponse = await apiresponse.json();
    displaymeals(apiresponse.meals);
}



async function searchbyletter(Letter){
    closenav();
    data.innerHTML=" ";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`);
    apiresponse = await apiresponse.json();
    displaymeals(apiresponse.meals);
}



function displaymeals(array) {
    let cartona = "";
    for (let i = 0; i < array.length; i++) {
        cartona += `
        <div class="col-md-3 mb-3">
        <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="mealdetails('${array[i].idMeal}')">
            <img class="w-100" src="${array[i].strMealThumb}" >
            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${array[i].strMeal}</h3>
            </div>
        </div>
</div>
        `
    }
    data.innerHTML = cartona;
}

displaymeals();
async function mealdetails(id) {
    closenav();
    data.innerHTML = " ";
    // $(".loading").fadeIn(100);
    Search.innerHTML = " ";
    let apirespone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    apirespone = await apirespone.json();
    displaymealdetails(apirespone.meals[0]);
    // $(".loading").fadeOut(100);
}

function displaymealdetails(m) {
    Search.innerHTML = " ";
    let ingred= ``;
    for (let i = 0; i <20; i++) {
        if (m[`strIngredient${i}`]) {
            ingred += `<li class="alert alert-info m-2 p-1">${m[`strMeasure${i}`]} ${m[`strIngredient${i}`]}</li>`
        }
    }
    let meals = m.strTags.split(",");
    if (!meals) meals = [];
    let meal = ''
    for (let i = 0; i < meals.length; i++) {
        meal += `
        <li class="alert alert-danger m-2 p-1">${meals[i]}</li>`
    }
    let cartona = `
    <div class="col-md-4  mt-4">
                <img class="w-100 rounded-3" src="${m.strMealThumb}"
                    alt="">
                    <h2>${m.strMeal}</h2>
            </div>
            <div class="col-md-8  mt-4">
                <h2>Instructions</h2>
                <p>${m.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${m.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${m.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingred}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${meal}
                </ul>

                <a  href="${m.strSource}" class="btn btn-success" target="_blank">Source</a>
                <a  href="${m.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
            </div>`

    data.innerHTML = cartona;
}
// end search inputs




// start Categories

async function categories() {
    data.innerHTML = "";
    // $(".loading").fadeIn(100);
    Search.innerHTML = "";
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    apiresponse = await apiresponse.json()
    displaycategories(apiresponse.categories)
    // $(".loading").fadeOut(100);

}



function displaycategories(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3 mb-3">
                <div onclick="categorymeals('${arr[i].strCategory}')" class="meal rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" >
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona;
}


async function categorymeals(category) {
    data.innerHTML = "";
    // $(".loading").fadeIn(100);
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    apiresponse = await apiresponse.json()
    displaymeals(apiresponse.meals.slice(0, 20))
    // $(".loading").fadeOut(100);
}


// End Categories




// start Area

async function area() {
    data.innerHTML = "";
    // $(".loading").fadeIn(100);
    Search.innerHTML = "";
    let apirespone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    apirespone = await apirespone.json()
    displayarea(apirespone.meals)
    // $(".loading").fadeOut(100);
}


function displayarea(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="areameals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona;
}

async function areameals(area) {
    data.innerHTML = "";
    // $(".loading").fadeIn(100);
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    apiresponse = await apiresponse.json();
    displaymeals(apiresponse.meals.slice(0, 20));
    // $(".loading").fadeOut(100);

}


//  end Area

// start Ingredients

async function ingredients() {
    data.innerHTML = " ";
    // $(".loading").fadeIn(100);
    Search.innerHTML = "";
    let apirespone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    apirespone = await apirespone.json();
    displayingredients(apirespone.meals.slice(0, 20))
    // $(".loading").fadeOut(100);

}
function  displayingredients(array){
    let cartona = " ";

    for (let i = 0; i < array.length; i++) {
        cartona+= `
        <div class="col-md-3 mb-3">
                <div onclick="ingredientsmeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${array[i].strIngredient}</h3>
                        <p>${array[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    data.innerHTML = cartona;
}

async function ingredientsmeals(ingred) {
    data.innerHTML = " ";
    // $(".loading").fadeIn(100);
    let apiresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
    apiresponse = await apiresponse.json();
    displaymeals(apiresponse.meals.slice(0, 20))
    // $(".loading").fadeOut(100);
}


// End Ingredients


// show contact data


function contactdata(){
    data.innerHTML=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container text-center w-75">
            <div class="row g-3 ms-3">
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control bg-transparent text-white" placeholder="Enter your name">
                </div>
                <div class="col-md-6 mb-3">
                    <input type="email" class="form-control  bg-transparent  text-white" placeholder="Enter your Email">
                </div>
                <div class="col-md-6 mb-3">
                    <input type="tel" class="form-control  bg-transparent  text-white" placeholder="Enter your phone">
                </div>
                <div class="col-md-6 mb-3">
                    <input type="number" class="form-control  bg-transparent  text-white" placeholder="Enter your age">
                </div>
                <div class="col-md-6 mb-3">
                    <input type="password" class="form-control  bg-transparent  text-white" placeholder="Enter your password">
                </div>
                <div class="col-md-6 mb-3">
                    <input type="password" class="form-control  bg-transparent  text-white" placeholder="Repassword">
                </div>
            </div>
            <button  class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>
    `
}





