import {importProvidersFrom} from '@angular/core';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RootComponent} from '@/components/root';

bootstrapApplication(RootComponent, {
	providers: [importProvidersFrom([BrowserModule, BrowserAnimationsModule])],
}).catch((err) => console.error(err));
