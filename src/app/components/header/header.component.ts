import { Component } from '@angular/core';
import { LucideAngularModule, Menu, Share2, Wifi, Battery, Bell } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <header class="h-16 border-b border-gray-800/50 bg-[#020617]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      
      <!-- Left: System Status -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e293b]/50 border border-gray-800">
           <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
           <span class="text-[10px] font-mono text-emerald-400 tracking-wider">ONLINE</span>
        </div>
        <div class="hidden md:flex h-4 w-[1px] bg-gray-800"></div>
        <div class="hidden md:flex items-center gap-4 text-gray-500 text-xs font-mono">
           <span class="flex items-center gap-1"><lucide-icon name="wifi" [size]="12" /> 14ms</span>
           <span class="flex items-center gap-1"><lucide-icon name="battery" [size]="12" /> 100%</span>
        </div>
      </div>
      
      <!-- Right: Actions -->
      <div class="flex items-center gap-3">
        <button class="p-2 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all relative">
          <lucide-icon name="bell" [size]="18" />
          <span class="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
        
        <a 
          href="https://21umas.edu.ye/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-sky-600/10 border border-sky-500/20 text-sky-400 hover:bg-sky-600/20 hover:border-sky-500/40 transition-all text-xs font-bold uppercase tracking-wide"
        >
          <span>University Portal</span>
          <lucide-icon name="share-2" [size]="12" />
        </a>
      </div>
    </header>
  `
})
export class HeaderComponent {}
