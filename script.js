const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 10;

// const apiKEY = '67H-VRp_KHAotsI7Er-maj0b8_PMoJlllaimAN6b5Z4';
const apiKEY = "YQWbu-0RpbrObd7rrj8K3R_M9aNWjBCgR36vN6QfdqA";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;


//when photos are loaded to keep loading images. Called everytime a photo loads
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//setAttribute function creator
//** iterates over the two atts and adds them as photos get looped over down below
function setAtts(element, attributes) {
    for (let key in attributes) {
        console.log(attributes[key])
        element.setAttribute(key, attributes[key])
    }
}
//elements for links and photos, add to the DOM.
//<a> and <img> are the atts
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;


    return photosArray.forEach(photo => {
        //link to unsplash
        const item = document.createElement("a");
        // console.log(item)
        setAtts(item, {
            href: photo.links.html,
            target: "_blank",
        });

        //create <img>
        const img = document.createElement("img");
        setAtts(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //place both in image container 
        item.appendChild(img); //put img into item then
        imageContainer.appendChild(item);//item into container
        img.addEventListener("load", imageLoaded);
    });
}


async function getPhotos() {
    try {
        const responce = await fetch(apiURL);
        photosArray = await responce.json();
        displayPhotos();
    } catch (error) {
        //
    }

}

//Check if scroll near bottom
//when total scroll value and screen size(height) is greater that all 10 pictures on the screen
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


getPhotos();
