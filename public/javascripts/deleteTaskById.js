window.onload = function() {
	var taskTable = document.getElementsByClassName('tasks-table')[0];
	console.log('taskTable is: ' + taskTable.classList);
	

	taskTable.onclick = function (event) {
		var target = event.target;
		console.log('ClassName of clicked element is: ' + target.className);

		while(target != taskTable) {
			console.log('Trying to detect, now for: ' + target.tagName);
			
			if(target.tagName == 'A' && target.className == 'tasks__delete-mark') {
				deleteTask(target);
				event.preventDefault();
				return;
			}
			target = target.parentNode;
		}
	}

	function deleteTask(node) {
		var xhr = new XMLHttpRequest();

		console.log('Starts to delete a task with _id: ' + node.id);
		console.log('Node tagName: ' + node.tagName);
		xhr.open('DELETE', './api/tasks/' + node.id);
		xhr.send();
		xhr.onload = xhr.onerror = () => {
			if (xhr.status == 200) {
				alert("Task successfully deleted");
				location.href = '/'
			} else {
				alert(`Error! ${xhr.status}:${xhr.statusText}`);
			}
		}
	}
}