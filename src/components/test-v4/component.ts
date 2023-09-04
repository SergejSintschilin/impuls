import {CommonModule} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TagModule} from 'primeng/tag';

import {genRandomInteger} from '@/utils/gen-random-integer';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class TestComponent {
	constructor() {
		effect((onCleanup) => {
			if (this.active()) {
				const timerId = setInterval(() => {
					console.log('set n1 and n2');
					this.n1.set(genRandomInteger(1, 6));
					this.n2.set(genRandomInteger(1, 6));
				}, 2000);
				onCleanup(() => {
					clearInterval(timerId);
				});
			}
		});
	}

	active = signal<boolean>(false);

	n1 = signal<number>(0);

	n2 = signal<number>(0);

	swap(): void {
		const n1 = this.n1();
		const n2 = this.n2();
		this.n1.set(n2);
		this.n2.set(n1);
	}

	sum = computed<number>(() => {
		console.log('calc sum');
		return this.n1() + this.n2();
	});

	sumEven = computed<boolean>(() => {
		console.log('calc sumEven');
		return !(this.sum() % 2);
	});
}
