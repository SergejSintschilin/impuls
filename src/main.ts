import {importProvidersFrom} from '@angular/core';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MyRootComponent} from '@/components/root';

bootstrapApplication(MyRootComponent, {
	providers: [importProvidersFrom([BrowserModule, BrowserAnimationsModule])],
}).catch((err) => console.error(err));
