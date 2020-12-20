
/**
 * Define Global Variables
*/
let virtualNavBar = document.createDocumentFragment(); //creating virtual element to hold the navbar
let navListUl = document.getElementById('navbar__list'); //prings in the ul ready for appending li
let Sections = document.querySelectorAll('section');  //holds the section elements
/**
 * End Global Variables
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * Start Helper Functions
*/
//make the link button of the section active
function makeLinkActive(newActivatedSection)
{
    let Links = document.querySelectorAll('a');
    let sectionNavTextContent = newActivatedSection.getAttribute('data-nav');
    Links.forEach(link=>{
            if(link.textContent == sectionNavTextContent)
                {
                    link.parentElement.classList.add('oldActivedLink');
                }
            else
                {
                    link.parentElement.classList.remove('oldActivedLink');
                }
        })   
}

///////make the section int viewport active
function makeSectionActive()
{
    Sections.forEach(section=>{
        let boundries = section.getBoundingClientRect();             
        let windowHeight = window.innerHeight;
        if( boundries.top >=0 && boundries.bottom <= (windowHeight + 200) )
            {
                Sections.forEach(active=>{
                    active.classList.remove('your-active-class', 'oldActivedSection');
                })
                section.classList.add('oldActivedSection'); 
                makeLinkActive(section);  
            }
    })
}

/// create the navigation menu
function makingNav()
{
    Sections.forEach( section=>{
        let textForNav = section.getAttribute('data-nav');
        let navName = document.createTextNode(textForNav);
        let listItem = document.createElement('li'); 
        let sectionLink =document.createElement('a');
        sectionLink.className = 'menu__link';
        
        //scroll to each section 
        sectionLink.addEventListener('click' , function(){ 
            section.scrollIntoView({behavior : 'smooth'});
        })
        
        //building process of the navigation-bar element     
        sectionLink.appendChild(navName);
        listItem.appendChild(sectionLink);        
        virtualNavBar.appendChild(listItem);
    })
    
    //
    navListUl.appendChild(virtualNavBar);
}

/* 
* End Helper Functions
*/
////////////////////////////////////////////////////////////////////////////////////////////////////

//making the navigation-bar process
makingNav();

//making the sections and links active process 
window.addEventListener( 'scroll',
    function (e) {
        e.preventDefault();
        makeSectionActive();
    }, false);

