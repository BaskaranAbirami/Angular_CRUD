import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private apiUrl = 'http://localhost:3000/students';

    constructor(private http: HttpClient) { }

    getAllStudents(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getStudent(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    removeStudent(studentId:number):Observable<any[]> {
        return this.http.delete<any[]>(`${this.apiUrl}/delete/${studentId}`);
    }

    editStudent(studentId:string,data):Observable<any[]> {
        return this.http.put<any[]>(`${this.apiUrl}/edit/${studentId}`,data);
    }

    addStudent(data):Observable<any>{
        return this.http.post(`${this.apiUrl}/add`,data);
    }
}