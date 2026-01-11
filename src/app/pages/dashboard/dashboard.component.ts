
import { Component, ElementRef, ViewChild, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AppStateService } from '../../services/app-state.service';
import { MarkdownRendererComponent } from '../../components/markdown-renderer.component';
import { WelcomeComponent } from '../../components/welcome/welcome.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, MarkdownRendererComponent, WelcomeComponent],
  template: `
    <div class="flex-1 flex flex-col h-full relative">
      <!-- Chat Area -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div class="max-w-4xl mx-auto w-full h-full">
          @if (state.messages().length === 0) {
            <app-welcome />
          } @else {
            @for (msg of state.messages(); track msg.id) {
              <div class="flex w-full mb-8 animate-in slide-in-from-bottom-2 duration-500" [class.justify-end]="msg.role === 'user'" [class.justify-start]="msg.role !== 'user'">
                <div class="flex max-w-[90%] md:max-w-[85%] gap-4" [class.flex-row-reverse]="msg.role === 'user'" [class.flex-row]="msg.role !== 'user'">
                  
                  <!-- Avatar -->
                  <div class="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg border border-white/5"
                    [ngClass]="msg.role === 'user' ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-gray-300' : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'">
                    <lucide-icon [name]="msg.role === 'user' ? 'user' : 'bot'" [size]="20" />
                  </div>

                  <!-- Content -->
                  <div class="flex flex-col gap-2 min-w-0 flex-1">
                    <div class="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-400" [class.flex-row-reverse]="msg.role === 'user'">
                       <span class="font-bold">{{ msg.role === 'user' ? 'User' : '21UMAS System' }}</span>
                       @if (msg.role !== 'user') {
                         <span class="px-1.5 py-0.5 rounded text-[9px] border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                           {{ msg.modelUsed === 'Pro' ? 'DEEP REASONING' : 'FAST ENGINE' }}
                         </span>
                       }
                    </div>

                    <div class="relative p-5 rounded-3xl shadow-lg border transition-all duration-300"
                       [ngClass]="msg.role === 'user' ? 'bg-[#1e293b] border-gray-700/50 text-white rounded-tr-sm' : 'bg-[#0f172a] border-gray-800 text-gray-100 rounded-tl-sm'">
                       
                       @if (msg.image) {
                         <div class="mb-4 rounded-xl overflow-hidden border border-gray-700 max-w-sm shadow-md">
                           <img [src]="msg.image" alt="User Upload" class="w-full h-auto" />
                         </div>
                       }

                       @if (msg.isThinking) {
                         <div class="flex flex-col gap-3">
                           <div class="flex items-center gap-3 text-sky-400">
                              <lucide-icon name="brain-circuit" class="animate-pulse" [size]="20" />
                              <span class="text-sm font-medium animate-pulse">جاري المعالجة...</span>
                           </div>
                         </div>
                       } @else {
                         <app-markdown-renderer [content]="msg.content" />
                       }
                    </div>

                    @if (msg.groundingSources && msg.groundingSources.length > 0) {
                      <div class="mt-2 p-3 bg-gray-900/30 rounded-xl border border-gray-800/50 backdrop-blur-sm">
                        <div class="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 mb-2">
                          <lucide-icon name="link" [size]="10" /> Verified Sources
                        </div>
                        <div class="flex flex-wrap gap-2">
                           @for (source of msg.groundingSources; track $index) {
                             <a [href]="source.uri" target="_blank" class="flex items-center gap-1.5 px-2 py-1 bg-[#1e293b]/50 border border-gray-700 rounded-md text-xs text-sky-400/80 truncate max-w-[200px]">
                               {{ source.title }}
                             </a>
                           }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          }
          <div #messagesEnd></div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 md:p-6 bg-[#020617]/80 backdrop-blur-xl border-t border-gray-800/50 z-20">
        <div class="max-w-4xl mx-auto w-full flex flex-col gap-3">
           <div class="flex justify-between items-center">
             <!-- Mode Selector -->
             <div class="flex bg-[#0f172a] p-1 rounded-xl border border-gray-700 w-fit">
                <button (click)="state.setMode('flash')" [class.bg-emerald-500-20]="state.mode() === 'flash'" [class.text-emerald-400]="state.mode() === 'flash'" class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-300">
                   <lucide-icon name="zap" [size]="14"/> Flash
                </button>
                <button (click)="state.setMode('pro')" [class.bg-sky-500-20]="state.mode() === 'pro'" [class.text-sky-400]="state.mode() === 'pro'" class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-300">
                   <lucide-icon name="brain-circuit" [size]="14"/> Pro
                </button>
             </div>
             
             @if (selectedImage) {
               <div class="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-700">
                  <lucide-icon name="image" [size]="14" class="text-sky-400" />
                  <span class="text-xs text-gray-300">Image Attached</span>
                  <button (click)="selectedImage = null" class="hover:text-red-400"><lucide-icon name="x" [size]="14" /></button>
               </div>
             }
           </div>

           <div class="relative flex items-end gap-2 bg-[#1e293b]/50 border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
              <button (click)="fileInput.click()" class="flex items-center justify-center h-10 w-10 text-gray-400 hover:text-white rounded-xl mb-1">
                 <lucide-icon name="paperclip" [size]="20" />
              </button>
              <input #fileInput type="file" class="hidden" accept="image/*" (change)="onFileSelected($event)">
              
              <textarea 
                [(ngModel)]="inputValue" 
                (keydown.enter)="handleEnter($event)"
                [placeholder]="state.mode() === 'pro' ? 'اكتب تفاصيل الحالة السريرية للتحليل العميق...' : 'اكتب سؤالك هنا للإجابة السريعة...'"
                class="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none py-3 min-h-[44px] max-h-32"
                rows="1"
              ></textarea>

              <button (click)="onSend()" [disabled]="!inputValue && !selectedImage" class="mb-1 p-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed">
                 <lucide-icon name="send" [size]="18" />
              </button>
           </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  state = inject(AppStateService);
  inputValue = '';
  selectedImage: string | null = null;
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  constructor() {
    effect(() => {
       // Trigger scroll when messages change
       this.state.messages(); 
       setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  scrollToBottom() {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch(err) {}
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImage = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  handleEnter(event: Event) {
    if ((event as KeyboardEvent).shiftKey) {
      return;
    }
    this.onSend(event);
  }

  onSend(e?: Event) {
    e?.preventDefault();
    if (!this.inputValue.trim() && !this.selectedImage) return;
    
    this.state.sendMessage(this.inputValue, this.selectedImage);
    this.inputValue = '';
    this.selectedImage = null;
  }
}
