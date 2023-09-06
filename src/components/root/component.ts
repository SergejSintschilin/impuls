import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

import {TestComponent} from '@/components/test';

@Component({
	imports: [TestComponent],
	selector: 'app-root',
	standalone: true,
	styleUrls: ['./component.scss'],
	templateUrl: './component.html',
})
export class RootComponent implements OnInit {
	constructor(public primeNGConfig: PrimeNGConfig) {}

	ngOnInit() {
		this.primeNGConfig.ripple = true;
	}
}
