import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TagModule} from 'primeng/tag';
import {
	BehaviorSubject,
	EMPTY,
	Subscription,
	auditTime,
	combineLatest,
	distinctUntilChanged,
	interval,
	map,
	share,
	switchMap,
} from 'rxjs';

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
	constructor() {
		this.subscription.add(
			this.active$
				.pipe(switchMap((active) => (active ? interval(2000) : EMPTY)))
				.subscribe(() => {
					console.log('set n1 and n2');
					this.n1$.next(genRandomInteger(1, 6));
					this.n2$.next(genRandomInteger(1, 6));
				}),
		);
	}

	active$ = new BehaviorSubject<boolean>(false);

	n1$ = new BehaviorSubject<number>(0);

	n2$ = new BehaviorSubject<number>(0);

	swap(): void {
		const n1 = this.n1$.value;
		const n2 = this.n2$.value;
		this.n1$.next(n2);
		this.n2$.next(n1);
	}

	sum$ = combineLatest([
		this.n1$.pipe(distinctUntilChanged()),
		this.n2$.pipe(distinctUntilChanged()),
	]).pipe(
		auditTime(0),
		map(([n1, n2]) => {
			console.log('calc sum');
			return n1 + n2;
		}),
		share(),
	);

	sumEven$ = this.sum$.pipe(
		distinctUntilChanged(),
		map((sum) => {
			console.log('calc sumEven');
			return !(sum % 2);
		}),
		share(),
	);

	subscription = new Subscription();

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
