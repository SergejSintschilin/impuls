import {CommonModule} from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
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
export class TestComponent implements OnDestroy {
	constructor(public changeDetectorRef: ChangeDetectorRef) {
		this.checkTimer();
	}

	get active(): boolean {
		return this.#active;
	}
	set active(v: boolean) {
		this.#active = v;
		this.checkTimer();
	}
	#active: boolean = false;

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

	timerId: any;

	startTimer(): void {
		if (this.timerId == null) {
			this.timerId = setInterval(() => {
				console.log('set n1 and n2');
				this.n1 = genRandomInteger(1, 6);
				this.n2 = genRandomInteger(1, 6);
				this.changeDetectorRef.markForCheck();
			}, 2000);
		}
	}

	stopTimer(): void {
		if (this.timerId != null) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}

	checkTimer(): void {
		if (this.active) {
			this.startTimer();
		} else {
			this.stopTimer();
		}
	}

	ngOnDestroy(): void {
		this.stopTimer();
	}
}
