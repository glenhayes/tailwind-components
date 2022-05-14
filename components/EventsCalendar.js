/* eslint-disable @next/next/no-img-element */
import { Fragment, useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from 'date-fns';
import classNames from 'classnames';

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDateTime: '2022-05-21T13:00',
    endDateTime: '2022-05-21T14:30',
  },
  {
    id: 2,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDateTime: '2022-05-06T13:00',
    endDateTime: '2022-05-06T14:30',
  },
  {
    id: 3,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDateTime: '2022-05-18T13:00',
    endDateTime: '2022-05-18T14:30',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDateTime: '2022-05-14T13:00',
    endDateTime: '2022-05-14T14:30',
  },
  // More meetings...
];

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

function EventsCalendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayOfCurrentMonth = useMemo(
    () => parse(currentMonth, 'MMM-yyyy', new Date()),
    [currentMonth]
  );

  const selectedDayMeetings = useMemo(
    () =>
      meetings.filter((meeting) =>
        isSameDay(parseISO(meeting.startDateTime), selectedDay)
      ),
    [selectedDay]
  );

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(firstDayOfCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
      }),
    [firstDayOfCurrentMonth]
  );

  function getNextMonth() {
    const firstDayNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }
  function getPrevMonth() {
    const firstDayNextMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  return (
    <div className="px-4 py-8">
      <div className="container mx-auto">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayOfCurrentMonth, 'MMMM yyyy')}
              </h2>
              <CalendarNav
                getPrevMonth={getPrevMonth}
                getNextMonth={getNextMonth}
              />
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => (
                <Day
                  key={day.toISOString()}
                  day={day}
                  dayInx={dayIdx}
                  selectedDay={selectedDay}
                  firstDayOfCurrentMonth={firstDayOfCurrentMonth}
                  meetings={meetings}
                />
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No meetings for today</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function CalendarNav({ getPrevMonth, getNextMonth }) {
  return (
    <Fragment>
      <button
        type="button"
        onClick={getPrevMonth}
        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={getNextMonth}
        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </Fragment>
  );
}

function Day({ day, dayIdx, selectedDay, firstDayOfCurrentMonth, meetings }) {
  return (
    <div
      key={day.toISOString()}
      className={classNames(
        dayIdx === 0 && colStartClasses[getDay(day)],
        'py-2'
      )}
    >
      <button
        type="button"
        onClick={() => setSelectedDay(day)}
        className={classNames(
          isEqual(day, selectedDay) && 'text-white',
          !isEqual(day, selectedDay) && isToday(day) && 'text-red-600',
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            isSameMonth(day, firstDayOfCurrentMonth) &&
            'text-gray-900',
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            !isSameMonth(day, firstDayOfCurrentMonth) &&
            'text-gray-400',
          isEqual(day, selectedDay) && isToday(day) && 'bg-red-600',
          isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
          !isEqual(day, selectedDay) && 'hover:bg-gray-200',
          (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
          'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
        )}
      >
        <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
      </button>
      <div className="relative flex justify-center">
        {meetings.some((meeting) =>
          isSameDay(parseISO(meeting.startDateTime), day)
        ) && (
          <div className="absolute w-1 h-1 bg-sky-500 rounded-full mx-auto mt-1"></div>
        )}
      </div>
    </div>
  );
}

function Meeting({ meeting }) {
  const startDateTime = parseISO(meeting.startDateTime);
  const endDateTime = parseISO(meeting.endDateTime);
  return (
    <li className="group flex items-center space-x-4 rounded-xl py-2 px-4 focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={meeting.imageUrl}
        alt=""
        className="h-10 w-10 flex-none rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDateTime}>
            {format(startDateTime, 'hh:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDateTime}>
            {format(endDateTime, 'hh:mm a')}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
}

export default EventsCalendar;
