window.onload = function() {
	var submitForm = document.getElementsByClassName('task-editor__form')[0];
	console.log('submitBtn is: ' + submitForm.classList);
	var cancelBtn = document.getElementById('cancelBtn');
	
	submitForm.onsubmit = function (event) {
		event.preventDefault();
		editTask(submitForm);
	}

	cancelBtn.onclick = function(event) {
		cancelEditingTask(event);
	}

	function editTask(node) {
		var xhr = new XMLHttpRequest();
		
		var newTaskName = document.getElementById('inputNewTaskName');
		var newTaskPriority = document.getElementById('inputNewTaskPriority');
		var newTaskStatus = document.getElementById('inputNewTaskStatus');

		var newTask = {
			name : newTaskName.value,
			priority : newTaskPriority.value,
			status : newTaskStatus.value
		};

		console.log(`New task name: ${newTaskName.value}`);
		console.log(`New task name: ${newTaskStatus.value}`);
		console.log(`New task name: ${newTaskPriority.value}`);
		
		var data = JSON.stringify(newTask);

		xhr.open('PUT', '/api/tasks/' + node.id);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(data);
		xhr.onload = xhr.onerror = () => {
			if (xhr.status == 200) {
				alert('Task edited');
				location.href='/';
			} else {
				alert(`Error! ${xhr.status}:${xhr.statusText}`);
			}
		}
	}

	function cancelEditingTask(event) {
		if(confirm('Are you sure want to cancel edit task?')){
			location.href='/';
		}
		event.preventDefault();
		return;
	}
}
