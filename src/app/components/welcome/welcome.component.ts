
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="flex flex-col h-full">
      
      <!-- Top HUD (Live Stats) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        <!-- Time Widget -->
        <div class="glass-panel p-4 rounded-2xl flex items-center justify-between border-l-4 border-l-sky-500 relative overflow-hidden group">
           <div class="absolute inset-0 bg-sky-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <div class="relative z-10">
             <div class="text-3xl font-black text-white font-mono tracking-widest" dir="ltr">
               {{ time | date:'HH:mm' }}
             </div>
             <div class="text-xs text-sky-400 font-bold uppercase tracking-widest mt-1">
               {{ time | date:'EEEE, MMM d' }}
             </div>
           </div>
           <lucide-icon name="clock" class="text-sky-500/20 relative z-10" [size]="48" />
        </div>

        <!-- System Status -->
        <div class="glass-panel p-4 rounded-2xl flex flex-col justify-center border-l-4 border-l-emerald-500 relative overflow-hidden group">
           <div class="absolute inset-0 bg-emerald-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <div class="relative z-10">
             <div class="flex justify-between items-center mb-2">
               <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">System Integrity</span>
               <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                 <div class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> OPTIMAL
               </span>
             </div>
             <div class="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
               <div class="bg-emerald-500 h-full w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse-slow"></div>
             </div>
             <div class="mt-3 flex gap-4 text-[10px] text-gray-500 font-mono">
               <span class="flex items-center gap-1 text-emerald-500/80"><lucide-icon name="cpu" [size]="10"/> 21UMAS-CORE v2.1</span>
               <span class="flex items-center gap-1 text-emerald-500/80"><lucide-icon name="wifi" [size]="10"/> 12ms LATENCY</span>
             </div>
           </div>
        </div>

        <!-- AI Status -->
        <div class="glass-panel p-4 rounded-2xl flex flex-col justify-center border-l-4 border-l-purple-500 relative overflow-hidden group">
           <div class="absolute inset-0 bg-purple-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
           <div class="flex items-center gap-3 relative z-10">
             <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
               <lucide-icon name="brain" class="text-purple-400 animate-pulse" [size]="24" />
             </div>
             <div>
               <div class="text-sm font-bold text-white flex items-center gap-2">
                 Gemini 2.5
                 <span class="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] border border-purple-500/30">ONLINE</span>
               </div>
               <div class="text-[10px] text-purple-300/70 uppercase tracking-wider mt-1">Deep Reasoning Engine Active</div>
             </div>
           </div>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="relative mb-10 p-8 md:p-10 rounded-3xl overflow-hidden group border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-sky-900/90"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <div class="absolute top-0 right-0 p-10 opacity-10">
           <lucide-icon name="activity" [size]="200" class="text-white" />
        </div>
        
        <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-right w-full">
             <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-4">
                <lucide-icon name="shield" class="text-sky-300" [size]="10" />
                Medical Command Center
             </div>
             <h1 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
               21UMAS <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">NEXUS</span>
             </h1>
             <p class="text-blue-100 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
               نظام التشغيل الطبي المركزي. تشخيص مدعوم بالذكاء الاصطناعي، بروتوكولات علاجية محدثة، وتحليل بيانات سريرية فوري.
             </p>
             <div class="flex flex-wrap gap-3">
               <button routerLink="/diagnosis" class="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                 <lucide-icon name="stethoscope" [size]="20" class="text-blue-600" /> 
                 <span>تشخيص حالة سريرية</span>
               </button>
               <button routerLink="/research" class="bg-blue-800/40 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-blue-700/50 transition-all flex items-center gap-2">
                 <lucide-icon name="search" [size]="20" /> 
                 <span>بحث في المصادر</span>
               </button>
             </div>
          </div>
        </div>
      </div>

      <!-- Quick Access Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
         <a routerLink="/gene" class="group p-4 rounded-2xl border border-gray-800 bg-[#151f32] hover:border-fuchsia-500/50 flex flex-col items-center justify-center transition-all">
             <div class="mb-3 p-3 rounded-xl bg-[#0f172a] group-hover:bg-fuchsia-500/10 text-fuchsia-400">
               <lucide-icon name="dna" [size]="24" />
             </div>
             <span class="text-sm font-bold text-gray-200">Genetics</span>
         </a>
         <a routerLink="/trauma" class="group p-4 rounded-2xl border border-gray-800 bg-[#151f32] hover:border-red-500/50 flex flex-col items-center justify-center transition-all">
             <div class="mb-3 p-3 rounded-xl bg-[#0f172a] group-hover:bg-red-500/10 text-red-400">
               <lucide-icon name="ambulance" [size]="24" />
             </div>
             <span class="text-sm font-bold text-gray-200">Trauma</span>
         </a>
         <a routerLink="/ecg" class="group p-4 rounded-2xl border border-gray-800 bg-[#151f32] hover:border-pink-500/50 flex flex-col items-center justify-center transition-all">
             <div class="mb-3 p-3 rounded-xl bg-[#0f172a] group-hover:bg-pink-500/10 text-pink-400">
               <lucide-icon name="heart-pulse" [size]="24" />
             </div>
             <span class="text-sm font-bold text-gray-200">Cardiology</span>
         </a>
         <a routerLink="/lab" class="group p-4 rounded-2xl border border-gray-800 bg-[#151f32] hover:border-green-500/50 flex flex-col items-center justify-center transition-all">
             <div class="mb-3 p-3 rounded-xl bg-[#0f172a] group-hover:bg-green-500/10 text-green-400">
               <lucide-icon name="test-tube-2" [size]="24" />
             </div>
             <span class="text-sm font-bold text-gray-200">Lab</span>
         </a>
         <a routerLink="/ventilator" class="group p-4 rounded-2xl border border-gray-800 bg-[#151f32] hover:border-cyan-500/50 flex flex-col items-center justify-center transition-all">
             <div class="mb-3 p-3 rounded-xl bg-[#0f172a] group-hover:bg-cyan-500/10 text-cyan-400">
               <lucide-icon name="wind" [size]="24" />
             </div>
             <span class="text-sm font-bold text-gray-200">Ventilator</span>
         </a>
      </div>

      <!-- Live Data Ticker -->
      <div class="mt-10 border-t border-gray-800 pt-6">
        <div class="flex items-center gap-4 bg-gray-900/50 p-3 rounded-xl border border-gray-800 shadow-inner">
           <div class="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase shrink-0 flex items-center gap-2 animate-pulse">
             <div class="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
             Live Feed
           </div>
           <div class="overflow-hidden relative w-full h-6 mask-linear-fade">
              <div class="absolute animate-marquee whitespace-nowrap text-sm text-gray-400 font-mono flex items-center gap-16 w-full">
                 <span class="flex items-center gap-2"><lucide-icon name="globe" [size]="12"/> WHO Alert: Surveillance increased.</span>
                 <span class="flex items-center gap-2"><lucide-icon name="zap" [size]="12"/> 21UMAS Update: New 'Deep Reasoning' model available.</span>
                 <span class="flex items-center gap-2"><lucide-icon name="activity" [size]="12"/> ICU Capacity: 85% Occupied.</span>
              </div>
           </div>
        </div>
      </div>

    </div>
  `
})
export class WelcomeComponent implements OnInit, OnDestroy {
  time = new Date();
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => this.time = new Date(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
