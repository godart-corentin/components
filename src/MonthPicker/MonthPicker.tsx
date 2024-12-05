import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import './MonthPicker.scss';

type MonthPickerProps = {
  date: Date;
  min?: Date;
  max?: Date;
  lang?: string;
  onChange: (date: Date) => void;
};

export const MonthPicker = ({
  date,
  min,
  max,
  lang = 'en',
  onChange,
}: MonthPickerProps) => {
  const [isPicking, setIsPicking] = useState(false);
  const [year, setYear] = useState(date.getFullYear());

  const todayDate = new Date();
  const canSelectPreviousYear = min ? year - 1 >= min.getFullYear() : true;
  const canSelectNextYear = max
    ? year + 1 <= max.getFullYear() && year < todayDate.getFullYear()
    : year < todayDate.getFullYear();

  const isMonthDisabled = (month: number): boolean =>
    (year === min?.getFullYear() && month < min.getMonth()) ||
    (year === max?.getFullYear() && month > max.getMonth());

  const isMonthActive = (month: number): boolean =>
    year === date.getFullYear() && month === date.getMonth();

  return (
    <div className="MonthPicker">
      <button className="toggle" onClick={() => setIsPicking((curr) => !curr)}>
        {date.toLocaleString(lang, { month: 'long', year: 'numeric' })}
      </button>
      {isPicking && (
        <div className="picker">
          <div className="yearSelector">
            <ChevronLeft
              className={`previousYear ${!canSelectPreviousYear ? 'disabled' : ''}`}
              onClick={() => {
                if (canSelectPreviousYear) {
                  setYear((y) => y - 1);
                }
              }}
            />
            <span className="year">{year}</span>
            <ChevronRight
              className={`nextYear ${!canSelectNextYear ? 'disabled' : ''}`}
              onClick={() => {
                if (canSelectNextYear) {
                  setYear((y) => y + 1);
                }
              }}
            />
          </div>
          <div className="months">
            {Array.from({ length: 12 }, (_, i) => i).map((i) => (
              <button
                type="button"
                className={`month ${isMonthActive(i) ? 'active' : ''}`}
                key={i}
                onClick={() => {
                  if (!isMonthDisabled(i) && !isMonthActive(i)) {
                    onChange(new Date(year, i, 1));
                    setIsPicking(false);
                  }
                }}
                disabled={isMonthDisabled(i)}
              >
                {new Date(date.getFullYear(), i).toLocaleString(lang, {
                  month: 'short',
                })}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
