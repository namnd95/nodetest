// Userlist data array for filling in info box
var todoList = [];

// DOM Ready =============================================================
$(document).ready(function() {    
    populateTodoList();
});

// Functions =============================================================

function populateTodoList() {    
    $.getJSON( '/todo/get', function( data ) {
        todoList = data;        
        $.each(todoList, function (){
           var cur = '<li id="' + this._id + '">';
           cur = cur + this.name;
           cur += '</li>';
           $('#todo-list').append(cur);
        });
    });
};

