import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Activity, LayoutDashboard, Search, Wind, Dna, Binary, Crosshair, Ambulance, Flame, Siren, Skull, HeartPulse, Baby, Brain, Droplet, Droplets, Hammer, Scissors, Eye, Smile, PersonStanding, ShieldPlus, Plane, Apple, Gavel, ShieldCheck, Scale, LineChart, ClipboardCheck, Pill, ScanEye, TestTube2, Calculator, Settings, Layers } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <aside class="hidden md:flex flex-col w-20 lg:w-[280px] border-l border-gray-800 bg-[#020617] h-full transition-all duration-300 relative z-50 shadow-2xl shadow-black/50">
      
      <!-- Brand -->
      <div class="h-24 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-800/50 bg-[#020617] relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative w-10 h-10 flex items-center justify-center mr-3">
            <div class="absolute inset-0 bg-sky-500/20 rounded-xl blur-md animate-pulse"></div>
            <lucide-icon name="activity" class="text-sky-400 relative z-10" [size]="24" />
        </div>
        <div class="hidden lg:flex flex-col">
           <span class="text-white font-black text-xl tracking-wider font-mono">21UMAS<span class="text-sky-500">.OS</span></span>
           <span class="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-bold mt-1">Medical Command</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-4 flex flex-col gap-6 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 hover:scrollbar-thumb-gray-700">
        @for (group of navGroups; track group.title) {
          <div class="flex flex-col gap-1">
            <div class="px-2 mb-2 hidden lg:flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-gray-800/50 pb-1 mx-2">
               <lucide-icon name="layers" [size]="10" />
               <span>{{group.title}}</span>
            </div>
            <div class="flex flex-col gap-1">
              @for (item of group.items; track item.id) {
                <a 
                  [routerLink]="['/', item.id]"
                  routerLinkActive="bg-[#1e293b] text-white shadow-lg shadow-black/20 border-gray-700/50 translate-x-1"
                  [routerLinkActiveOptions]="{exact: true}"
                  class="relative flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all duration-300 group overflow-hidden text-gray-400 hover:bg-[#1e293b]/50 hover:text-white border border-transparent hover:translate-x-1"
                  [title]="item.label"
                >
                  <lucide-icon [name]="item.iconName" [size]="20" class="relative z-10 transition-colors duration-300" [ngClass]="item.color" />
                  <span class="relative z-10 hidden lg:block font-medium text-sm">{{item.label}}</span>
                  
                  <!-- Active Indicator (Visible only when active class is applied via routerLinkActive) -->
                  <div class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-sky-500 rounded-r-full shadow-[0_0_10px_rgba(14,165,233,0.8)] hidden [.active_&]:block"></div>
                </a>
              }
            </div>
          </div>
        }
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-800 bg-[#020617]">
        <button class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-gray-800 group">
          <lucide-icon name="settings" [size]="20" class="group-hover:rotate-90 transition-transform duration-500" />
          <span class="hidden lg:block text-sm font-medium">System Config</span>
        </button>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  navGroups = [
    {
      title: 'القيادة والتحكم',
      items: [
        { iconName: 'layout-dashboard', label: 'مركز القيادة', id: 'dashboard', color: 'text-sky-400' },
      ]
    },
    {
      title: 'النخبة (Genius Tier)',
      items: [
        { iconName: 'search', label: 'المحقق الطبي', id: 'detective', color: 'text-purple-400' },
        { iconName: 'wind', label: 'طيار العناية (ICU)', id: 'ventilator', color: 'text-cyan-400' },
        { iconName: 'dna', label: 'المستشار الجيني', id: 'gene', color: 'text-fuchsia-400' },
        { iconName: 'binary', label: 'مجلس الأورام', id: 'onco', color: 'text-rose-600' },
        { iconName: 'crosshair', label: 'المخطط الجراحي', id: 'surg_strategy', color: 'text-emerald-400' },
      ]
    },
    {
      title: 'الطوارئ والإصابات',
      items: [
        { iconName: 'ambulance', label: 'قائد الصدمات', id: 'trauma', color: 'text-red-600' },
        { iconName: 'flame', label: 'وحدة الحروق', id: 'burn', color: 'text-orange-500' },
        { iconName: 'siren', label: 'فرز الطوارئ', id: 'triage', color: 'text-red-500' },
        { iconName: 'skull', label: 'معالج السموم', id: 'toxicology', color: 'text-orange-400' },
      ]
    },
    {
      title: 'تخصصات دقيقة',
      items: [
        { iconName: 'heart-pulse', label: 'مايسترو التخطيط', id: 'ecg', color: 'text-pink-500' },
        { iconName: 'baby', label: 'حارس الأمومة', id: 'obgyn', color: 'text-rose-400' },
        { iconName: 'brain', label: 'المحدد العصبي', id: 'neuro', color: 'text-violet-400' },
        { iconName: 'droplet', label: 'طيار الكلى', id: 'nephro', color: 'text-blue-600' },
        { iconName: 'droplets', label: 'هيمي-باث (الدم)', id: 'heme', color: 'text-red-500' },
      ]
    },
    {
      title: 'الجراحة والعظام',
      items: [
        { iconName: 'hammer', label: 'المهندس العظمي', id: 'ortho', color: 'text-orange-400' },
        { iconName: 'scissors', label: 'تصريح العمليات', id: 'surgery', color: 'text-teal-400' },
        { iconName: 'eye', label: 'منظار العيون', id: 'ophtha', color: 'text-blue-300' },
        { iconName: 'smile', label: 'الوجه والفكين', id: 'dental', color: 'text-yellow-200' },
      ]
    },
    {
      title: 'الوقاية والتأهيل',
      items: [
        { iconName: 'person-standing', label: 'مهندس التأهيل', id: 'rehab', color: 'text-lime-400' },
        { iconName: 'shield-plus', label: 'استراتيجي اللقاحات', id: 'vax', color: 'text-emerald-500' },
        { iconName: 'plane', label: 'طب السفر', id: 'travel', color: 'text-sky-500' },
        { iconName: 'apple', label: 'نمط الحياة', id: 'lifestyle', color: 'text-green-400' },
      ]
    },
    {
      title: 'تحليل وتوثيق',
      items: [
        { iconName: 'gavel', label: 'المحلل الجنائي', id: 'forensic', color: 'text-slate-400' },
        { iconName: 'shield-check', label: 'حارس المضادات', id: 'antibiotic', color: 'text-yellow-400' },
        { iconName: 'scale', label: 'المستشار الأخلاقي', id: 'ethics', color: 'text-gray-300' },
        { iconName: 'line-chart', label: 'الساحر الإحصائي', id: 'stats', color: 'text-green-300' },
        { iconName: 'clipboard-check', label: 'مُولد Op-Note', id: 'op_note', color: 'text-teal-300' },
      ]
    },
    {
      title: 'أدوات أساسية',
      items: [
        { iconName: 'stethoscope', label: 'تشخيص ذكي', id: 'diagnosis', color: 'text-indigo-400' },
        { iconName: 'pill', label: 'دليل الأدوية', id: 'drugs', color: 'text-emerald-400' },
        { iconName: 'scan-eye', label: 'مركز الأشعة', id: 'radiology', color: 'text-blue-400' },
        { iconName: 'test-tube-2', label: 'محلل المختبر', id: 'lab', color: 'text-green-400' },
        { iconName: 'calculator', label: 'مقياس المخاطر', id: 'calc', color: 'text-slate-400' },
      ]
    }
  ];
}
