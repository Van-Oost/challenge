$( document ).ready(function(){
    updateCounter()
    dragNdrop()
});
    

function dragNdrop(){
    $( "#sortable" ).sortable({
        items:".sortable-item",
        
        containment: "parent",
        cursor: "move",
        animation: 150,

    });
}


function editItem(){

};

function checkLength(){
    
}

function deleteItem(){

};


function updateCounter(){
    var itemCount = document.getElementById("sortable").getElementsByClassName("sortable-item").length;
    var counter= document.getElementById("counter");
    counter.innerHTML = itemCount+" ITEMS";
};


function saveList(){

};


function retrieveList(){

};


