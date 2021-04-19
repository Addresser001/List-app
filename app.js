let list = document.querySelector('ul')
const AddBtn = document.querySelector('.Add');
const addForm = document.querySelector('#addForm');
const header = document.querySelector('header');




// Creating the input elements
function create(){
    
    let value = addForm.item.value;
    if(value.length >= 1){
        
        let li=document.createElement('li');
        let span =document.createElement('span')
        let dltBtn = document.createElement('button')
        dltBtn.innerText='delete';
        dltBtn.innerHTML+='<i class="fa fa-trash"></i>'

        li.classList.add('text');
        dltBtn.classList.add('delete');

        span.textContent=value;

        li.appendChild(span);
        li.appendChild(dltBtn)
        list.appendChild(li)

        storage(value);
        
    }
    
    else{
        alert('Input field is Empty!')
    }
}   

// the Add button
AddBtn.addEventListener('click', e =>{
    e.preventDefault();
    create();   
    addForm.item.value='';
    addForm.item.focus();
    
});


// The Delete button effect
const deleteBtn = document.querySelector('.delete');

list.addEventListener('click', e =>{
    let item =e.target;
    if(item.className == 'delete'){

        let parentItem = item.parentElement
        parentItem.classList.add('fall');
        parentItem.addEventListener('transitionend',()=>{
            parentItem.remove();
        })

        removeSavedWorks(parentItem);
        
    }
    
})



// Storing inputted values on a Local Storage
function storage(work){
    let works;
    if(localStorage.getItem('works')== null){
        works = [];
    }else{
        works = JSON.parse(localStorage.getItem('works'));
    }
    works.push(work);
    localStorage.setItem("works", JSON.stringify(works));
}

// Getting previous values in the storage to display
function getSavedWorks(){
    let works;
    if(localStorage.getItem('works')== null){
        works = [];
    }else{
        works = JSON.parse(localStorage.getItem('works'));
    }
    works.forEach(work => {
        let li=document.createElement('li');
        let span =document.createElement('span')
        let dltBtn = document.createElement('button')
        dltBtn.innerText='delete';
        dltBtn.innerHTML+='<i class="fa fa-trash"></i>'

        li.classList.add('text');
        dltBtn.classList.add('delete');

        span.textContent=work;

        li.appendChild(span);
        li.appendChild(dltBtn)
        list.appendChild(li)
    });
}
window.addEventListener('DOMContentLoaded', getSavedWorks);



// removing values from the storage, when the Delete button is clicked
function removeSavedWorks(work){
    let works;
    if(localStorage.getItem('works')== null){
        works = [];
    }else{
        works = JSON.parse(localStorage.getItem('works'));
    }

    let item= work.children[0].innerText;
    works.splice(works.indexOf(item), 1)
    localStorage.setItem("works", JSON.stringify(works));
}

