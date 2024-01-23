import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todos.interfaces';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent {
  todos: Todo[] = []
  error: string = '';
  

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    } catch(e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  
  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get<Todo[]>(url));
  }


  async toggleTodoStatus(todo: Todo) {
    todo.checked = !todo.checked;
  
    try {
      const url = environment.baseUrl + '/todos/' + todo.id + '/';
      await lastValueFrom(this.http.put(url, { checked: todo.checked }));
    } catch (e) {
      this.error = 'Fehler beim updaten des erledigt Status';
    }
  }


  async deleteTodo(todo: Todo) {
    try {
      const url = environment.baseUrl + '/todos/' + todo.id + '/';
      await lastValueFrom(this.http.delete(url));
      this.todos = this.todos.filter((t: { id: number; }) => t.id !== todo.id);
    } catch (e) {
      console.error('Error deleting todo:', e);
    }
  }
}
