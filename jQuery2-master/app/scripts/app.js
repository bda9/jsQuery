$(document).ready(function() {
  //hide the input form until button is clicked
  $('#newTaskForm').hide();
  //golbal variables
  var listo = [];
  //constructor function for making new tasks
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  }
  //shift the list item over when we hover the mouse
  $("li").hover(function() {
    $(this).animate({
      marginLeft: 38,
      marginRight: 0
    });
  }, function() {
    $(this).animate({
      marginLeft: 18,
      marginRight: 18
    });
  });
  //here we advance Task
  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };
  //prevent creation of blank tasks with the if(task)
  //call the task constructor, fill in the new task, and push to listo arr
  //clear out form after input
  var addTask = function(task) {
    if (task) {
      task = new Task(task);
      listo.push(task);
      //show new li on our page
      $('#newItemInput').val('');
      //task.task ===  call my constructor function in order to create a task?
      $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span></span></li></a>');
    }
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  };
  //preventDefault === If this method is called, the default action of the event will not be triggered
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
  });
  $(document).on('dblclick', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
  });
  //Opens form
  $('#newListItem').on('click', function() {
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function(e) {
    e.preventDefault();

    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
  });
  //moves the tasks to different categories on click
  $(document).on('dblclick', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });
  $(document).on('dblclick', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML;
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });
  $(document).on('dblclick', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
  //moves the tasks to previous category when double clicked
});
