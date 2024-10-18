import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Do not declare AppComponent here since it's a standalone component
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  // Do not bootstrap AppComponent here
})
export class AppModule { }
