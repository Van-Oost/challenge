$( document ).ready(function(){
    retrieveList()
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
    saveList()
}


function editItem(){

};

function checkLength(){
    
}

function deleteItem(){

};


function updateCounter(){
    var itemCount = document.getElementById("sortable").getElementsByClassName("sortable-item").length;
    var counter = document.getElementById("counter");
    counter.innerHTML = itemCount+" ITEMS";
};


function saveList(){
        var listContents = [];
        $("#sortable").each(function(){
           listContents.push(this.innerHTML);
        })
        localStorage.setItem("itemsList", JSON.stringify(listContents));
        console.log(JSON.stringify(listContents))

};


function retrieveList(){
    if (localStorage.getItem("itemsList") !== null){
    var obtainedList = JSON.parse(localStorage.getItem("itemsList"));
    $( "#sortable" ).innerHTML = obtainedList;
    }
};

/* 
<script>
$(function(){
    var order=JSON.parse(localStorage.order||"[]")
    $.each(order,function(i,id){
        $("#"+id).appendTo($( '#sortable' ))
    })
    $( '#sortable' ).sortable({
        stop:stop,
    });
    function stop(e,ui){
        var order=$(this).children().map(function(){return this.id}).get()
        localStorage.order=JSON.stringify(order)
    }
})
</script> */


