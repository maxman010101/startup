import React from 'react';
import './activechats.css';

import { NavLink, Outlet } from 'react-router-dom';
//import { Chat } from '../chat/chat';


export function ActiveChats() {
  return (
    <div>
    <main className="container-fluid bg-warning text-center p-4">
      <section className="bg-dark text-white p-3 rounded mb-4">
        <p>Click on the number of the chat you wish to enter:</p>
        <nav>
          <menu className="d-flex justify-content-center gap-3">
            <li><NavLink className="btn btn-warning" to="chat">1</NavLink></li>
            <li><NavLink className="btn btn-warning" to="chat">2</NavLink></li>
            <li><NavLink className="btn btn-warning" to="chat">3</NavLink></li>
          </menu>
        </nav>
      </section>
    
      <table className="table table-info table-striped-columns">
        <thead className="table-danger">
          <tr>
            <th>#</th>
            <th>Chat Name</th>
            <th>Comments</th>
            <th>Date of Last Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Favorite Songs</td>
            <td>2</td>
            <td>May 20, 2021</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Best Action Movie</td>
            <td>3</td>
            <td>June 2, 2021</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Politics Chat</td>
            <td>4</td>
            <td>July 3, 2020</td>
          </tr>
        </tbody>
      </table>
    </main>
    
    <Outlet />
    </div>
  );
}