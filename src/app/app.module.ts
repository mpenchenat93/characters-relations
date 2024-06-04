import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MarkdownModule } from 'ngx-markdown';
import { VisModule } from 'ngx-vis';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';

import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChartComponent } from './pages/chart/chart.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';

import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { FooterComponent } from './components/footer/footer.component';
import { GraphNetworkComponent } from './components/graph-network/graph-network.component';
import { HeaderComponent } from './components/header/header.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { ContactComponent } from './pages/contact/contact.component';

import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    CharacterSheetComponent,
    GraphNetworkComponent,
    FooterComponent,
    HeaderComponent,
    TableDetailComponent,
    ChartComponent,
    ContactComponent,
    AboutComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    VisModule,
    FormsModule,
    NgSelectModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CardModule,
    PanelModule,
    BreadcrumbModule,
    MenubarModule,
    DialogModule,
    InputTextModule,
    FieldsetModule,
    DividerModule,
    ProgressSpinnerModule,
    SidebarModule,
    PaginatorModule,
    BlockUIModule,
    MarkdownModule.forRoot(),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
