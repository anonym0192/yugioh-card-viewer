let completeList = [];
let resultList = [];

let NEXT_PAGE_TO_LOAD = "";
let NEXT_PAGE_OFFSET = "";
let PAGES_REMAINING = "";

const LIMIT = 30;


function s(el){
    return document.querySelector(el);
}

function sa(el){
    return document.querySelectorAll(el);
}

/* Make the request to the API*/
async function makeRequest(e){
        
        if(e.target.getAttribute('id') !== 'loadmore'){
           reset(); 
        }

        showLoading();

        const res = await fetch(buildQuery());
        const json = await res.json();

        hideLoading();

        if(json.error){
            s('.results').innerHTML = `<div class="error-msg">${json.error}</div>`
        }else{

            //List of all cards rendered on screen
            completeList = [...completeList, ...json.data];

            //List of the request result
            resultList = json.data;

            PAGES_REMAINING = json.meta.pages_remaining;
            NEXT_PAGE_TO_LOAD = json.meta.next_page;
            
            //Render the result
            loadItensResult();  

            NEXT_PAGE_OFFSET = json.meta.next_page_offset;          
        } 

}


/* Build the query that will be used in request*/
function buildQuery(){
    
    let name = s('#name').value;
    let level = s('#level').value;
    let type = s('#type').value;
    let race = s('#race').value;
    let attribute = s('#attribute').value;

    name = (name) ? `&fname=${name}` : '';
    level = (level != 'Unset') ? `&level=${level}` : '';
    type = (type != 'Unset') ? `&type=${type}` : '';
    race = (race != 'Unset') ? `&race=${race}` : '';
    attribute = (attribute != 'Unset') ? `&attribute=${attribute}` : '';

    let offset = (NEXT_PAGE_OFFSET) ? `&offset=${NEXT_PAGE_OFFSET}` : '&offset=0';

    return `${API_BASENAME}?num=${LIMIT}${offset}${name}${level}${race}${attribute}${type}`;
}

/*Clean the result list */
function reset(){

    NEXT_PAGE_TO_LOAD = "";
    NEXT_PAGE_OFFSET = "";
    PAGES_REMAINING = "";
    completeList = [];
    resultList = [];
    s('.results').innerHTML = '';
    s('#loadmore').style.display = 'none';
}


/*Load the elements to show the result of request on screen  */
function loadItensResult(){

    resultList.map((item, index)=>{
        
        const key = index + NEXT_PAGE_OFFSET;

        const card = s('.models .card').cloneNode(true);
        card.setAttribute('data-key', key );
        card.querySelector('img').src = item.card_images[0].image_url_small;
           
        const properties = {...CARD_PROPERTIES};

        properties.name += item.name;
        properties.level += item.level;
        properties.type += item.type;
        properties.race += item.race;
        properties.attribute += item.attribute;
        properties.archetype += item.archetype;
        properties.atk += item.atk;
        properties.def += item.def;
        properties.desc += item.desc;


        const tooltip = card.querySelector('.card--tooltip');

        /*Show only properties that are defined*/
        for(let i in properties){
            if(properties[i].indexOf("undefined") == -1){    
                tooltip.innerHTML += `<span>${properties[i]}</span>`;
            }
        }
        
        card.addEventListener('click',(e)=>{
            
            //Clean the modal and Opens it
            resetModalItems();
            openModal();

            //Render the properties for the selected card inside the modal
            console.log(key);
            changeModalCard(key);
        });

        s('.results').append(card);
    })

//Logic to show the load more button or not
    if(PAGES_REMAINING){
        s('#loadmore').style.display = 'block';
    }else{
        s('#loadmore').style.display = 'none';
    }
}


/*Show the modal*/
function openModal(){

    document.body.style.overflow = 'hidden';
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';
    setTimeout(()=>{
        modal.style.opacity = 1;
    }, 200);
}

/*Hide the modal */
function closeModal(){

    document.body.style.overflow = 'auto';
    const modal = document.querySelector('.modal');
    modal.style.opacity = 0.4;
    setTimeout(()=>{
        modal.style.display = 'none';
    }, 400);
}


/*Load a card in modal modal */
function changeModalCard(key){
  
    const item = completeList[key];
    
    if(!item){
        return;
    }

    const properties = {...CARD_PROPERTIES};

    properties.level += item.level;
    properties.type += item.type;
    properties.race += item.race;
    properties.attribute += item.attribute;
    properties.archetype += item.archetype;
    properties.atk += item.atk;
    properties.def += item.def;
    properties.desc += item.desc;

    resetModalItems();

    const modal = s('.modal');

    modal.setAttribute('card', key);

    setTimeout(()=>{
        modal.querySelector('img').src = item.card_images[0].image_url;
    },200);

    const featuresArea = modal.querySelector('.modal--features-area');

    featuresArea.innerHTML += `<h4>${item.name}</h4>`;
    
    for(let i in properties){
        if(properties[i].indexOf("undefined") == -1 ){    
            featuresArea.innerHTML += `<span>${properties[i]}</span>`;
        }
    } 

}

/*Reset the data elements inside the modal  */
function resetModalItems(){
     s('.modal img').src = 'assets/img/placeholder_image.png';
     s('.modal .modal--features-area').innerHTML = "";
}


function showLoading(){
    s('.loading').style.display = 'block';
}
function hideLoading(){
    s('.loading').style.display = 'none';
}


window.onload = function(){

    /*Load the options for the form*/
    LEVELS.forEach(level=>{
        s('#level').innerHTML+= `<option>${level}</option`;
    });

    ATTRIBUTES.forEach(attribute=>{
       s('#attribute').innerHTML+= `<option>${attribute}</option>`;
    });

    RACES.forEach(race=>{
        
        s('#race').innerHTML += `<optgroup label='${race.label}'></optgroup>`;
        const optgroup = s(`#race optgroup[label = "${race.label}"]`);
        race.options.forEach(raceName=>{  
            optgroup.innerHTML += `<option>${raceName}</option>`;
        });     
    });

    TYPES.forEach(type=>{
        
        s('#type').innerHTML += `<optgroup label='${type.label}'></optgroup>`;
        const optgroup = s(`#type optgroup[label = "${type.label}"]`);
        type.options.forEach(typeName=>{
            optgroup.innerHTML += `<option>${typeName}</option>`;
        });     
    });
    

    /* Form and Buttons events */
    s('#search').addEventListener('click', makeRequest);
    s('.search-area').addEventListener('keyup',(e)=>{
        if(e.keyCode === 13){
            makeRequest(e);
        }
    });
    s('#reset').addEventListener('click', reset);
    s('#loadmore').addEventListener('click', makeRequest);
    s('.modal').addEventListener('click', closeModal);

    document.addEventListener('keyup', (e)=>{

        if(e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 27 ){

            const modal = s('.modal');
            const isModalOpen = modal.style.display === 'none' ? false : true;

            if(e.keyCode === 27 && isModalOpen){
                closeModal();
                return;
            }

            if(e.keyCode === 37 && isModalOpen){
                const currentCard = parseInt(modal.getAttribute('card'));
                changeModalCard(currentCard - 1);
                return;
            }

            if(e.keyCode === 39 && isModalOpen){
                const currentCard = parseInt(modal.getAttribute('card'));
                changeModalCard(currentCard + 1);
                return;
            }
        }

    });

    document.getElementById('name').focus();
}