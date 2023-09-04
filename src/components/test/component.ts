import {CommonModule} from '@angular/common';
import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TagModule} from 'primeng/tag';

@Component({
	imports: [
		ButtonModule,
		CardModule,
		CommonModule,
		FormsModule,
		InputSwitchModule,
		TagModule,
	],
	selector: 'app-test',
	standalone: true,
	styleUrls: ['./component.scss'],
	templateUrl: './component.html',
})
export class TestComponent implements OnDestroy {
	constructor() {}

	active: boolean = false;

	n1: number = 0;

	n2: number = 0;

	swap(): void {
		const n1 = this.n1;
		const n2 = this.n2;
		this.n1 = n2;
		this.n2 = n1;
	}

	get sum(): number {
		console.log('calc sum');
		return this.n1 + this.n2;
	}

	get sumEven(): boolean {
		console.log('calc sumEven');
		return !(this.sum % 2);
	}

	ngOnDestroy(): void {}
}
