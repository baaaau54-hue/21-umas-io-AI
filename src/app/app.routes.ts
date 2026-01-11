
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GenericPanelComponent } from './components/generic-panel/generic-panel.component';

// Define route helper
const panel = (path: string) => ({ path, component: GenericPanelComponent, data: { type: path } });

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  panel('diagnosis'), panel('drugs'), panel('library'), panel('scribe'), panel('board'),
  panel('simplifier'), panel('osce'), panel('triage'), panel('research'), panel('lab'),
  panel('sbar'), panel('algorithm'), panel('radiology'), panel('procedure'), panel('lifestyle'),
  panel('toxicology'), panel('translator'), panel('evidence'), panel('pediatric'), panel('surgery'),
  panel('calc'), panel('derma'), panel('psych'), panel('quiz'), panel('surg_strategy'),
  panel('mnm'), panel('op_note'), panel('detective'), panel('antibiotic'), panel('ventilator'),
  panel('ortho'), panel('neuro'), panel('onco'), panel('heme'), panel('fluids'),
  panel('ophtha'), panel('dental'), panel('ethics'), panel('stats'), panel('gene'),
  panel('trauma'), panel('ecg'), panel('obgyn'), panel('rehab'), panel('vax'),
  panel('burn'), panel('nephro'), panel('forensic'), panel('travel')
];
