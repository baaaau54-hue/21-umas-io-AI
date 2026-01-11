import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden">
      <!-- Background pattern -->
      <div 
        class="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px"
      ></div>
      
      <app-sidebar />
      
      <div class="flex-1 flex flex-col h-full relative z-10">
        <app-header />
        <main class="flex-1 overflow-hidden relative flex flex-col w-full">
           <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class AppComponent {}
