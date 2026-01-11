
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AppStateService } from '../../services/app-state.service';
import { PanelConfig, PanelField } from '../../types';
import { PANEL_CONFIGS } from '../../data/panel-configs';

@Component({
  selector: 'app-generic-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="max-w-2xl mx-auto">
        <div class="mb-8 flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all" 
               [ngClass]="'bg-gradient-to-br from-' + config().color + '-500 to-' + config().color + '-600 shadow-' + config().color + '-900/30'">
            <lucide-icon [name]="config().icon" [size]="32" class="text-white" />
          </div>
          <div>
            <h2 class="text-3xl font-bold text-white">{{config().title}}</h2>
            <p class="font-medium" [ngClass]="'text-' + config().color + '-300'">{{config().subtitle}}</p>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden">
          <!-- Ambient Glow -->
          <div class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20" 
               [ngClass]="'bg-' + config().color + '-500'"></div>

          <div class="grid grid-cols-1 gap-4" [ngClass]="{'md:grid-cols-2': hasGridFields}">
            @for (field of config().fields; track field.key) {
              <div class="space-y-2" [ngClass]="{'md:col-span-2': !field.cols || field.cols === 2}">
                <label class="text-sm font-bold text-gray-400">{{field.label}}</label>
                
                @if (field.type === 'textarea') {
                  <textarea 
                    [(ngModel)]="values[field.key]" 
                    class="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-white focus:ring-1 transition-all h-32 resize-none"
                    [ngClass]="'focus:border-' + config().color + '-500 focus:ring-' + config().color + '-500'"
                    [placeholder]="field.placeholder"
                  ></textarea>
                } 
                @else if (field.type === 'select') {
                  <select 
                    [(ngModel)]="values[field.key]"
                    class="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:ring-1 transition-all"
                    [ngClass]="'focus:border-' + config().color + '-500 focus:ring-' + config().color + '-500'"
                  >
                    @for (opt of field.options; track opt.value) {
                      <option [value]="opt.value">{{opt.label}}</option>
                    }
                  </select>
                }
                @else if (field.type === 'file') {
                   <div 
                      (click)="fileInput.click()"
                      class="border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#0f172a]"
                      [ngClass]="values[field.key] ? 'border-' + config().color + '-500 bg-' + config().color + '-500/10' : 'border-gray-700 hover:border-gray-500'"
                    >
                      <input #fileInput type="file" class="hidden" accept="image/*" (change)="onFileSelect($event, field.key)">
                      
                      @if (values[field.key]) {
                        <div class="relative h-full w-full p-2 flex items-center justify-center">
                          <img [src]="values[field.key]" alt="Preview" class="max-h-full max-w-full rounded-lg object-contain" />
                          <button 
                              (click)="clearFile($event, field.key)"
                              class="absolute top-4 right-4 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                          >
                            <lucide-icon name="x" [size]="16" />
                          </button>
                        </div>
                      } @else {
                        <lucide-icon name="upload-cloud" [size]="48" class="text-gray-500 mb-4" />
                        <p class="text-gray-400 font-medium">{{field.placeholder}}</p>
                      }
                   </div>
                }
                @else {
                  <input 
                    [type]="field.type"
                    [(ngModel)]="values[field.key]" 
                    class="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-white focus:ring-1 transition-all"
                    [ngClass]="'focus:border-' + config().color + '-500 focus:ring-' + config().color + '-500'"
                    [placeholder]="field.placeholder"
                  />
                }
              </div>
            }
          </div>

          <button 
            (click)="submit()" 
            [disabled]="!isValid()" 
            class="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            [ngClass]="'bg-gradient-to-r from-' + config().color + '-600 to-' + config().color + '-700 hover:shadow-' + config().color + '-500/20'"
          >
            <lucide-icon [name]="config().submitIcon || 'send'" [size]="20" />
            <span>{{config().submitLabel}}</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class GenericPanelComponent implements OnInit {
  state = inject(AppStateService);
  route = inject(ActivatedRoute);
  
  config = signal<PanelConfig>(PANEL_CONFIGS['diagnosis']); // Default
  values: any = {};
  hasGridFields = false;

  ngOnInit() {
    this.route.data.subscribe(data => {
      const type = data['type'];
      if (PANEL_CONFIGS[type]) {
        this.config.set(PANEL_CONFIGS[type]);
        this.resetValues();
        this.hasGridFields = this.config().fields.some(f => f.cols === 1);
      }
    });
  }

  resetValues() {
    this.values = {};
    this.config().fields.forEach(f => {
      this.values[f.key] = '';
      if (f.type === 'select' && f.options?.length) {
        this.values[f.key] = f.options[0].value;
      }
    });
  }

  onFileSelect(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.values[key] = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  clearFile(event: Event, key: string) {
    event.stopPropagation();
    this.values[key] = '';
  }

  isValid() {
    // Require at least one field to be filled (excluding selects which have defaults)
    return this.config().fields.some(f => {
      if (f.type === 'select') return true; 
      return !!this.values[f.key];
    });
  }

  submit() {
    const prompt = this.config().promptTemplate(this.values);
    const sys = this.config().systemInstruction ? this.config().systemInstruction!(this.values) : undefined;
    
    // Find image if any
    const imageField = this.config().fields.find(f => f.type === 'file');
    const image = imageField ? this.values[imageField.key] : null;

    this.state.sendMessage(prompt, image, sys);
  }
}
