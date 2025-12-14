import { useMemo, useState } from "react";

const owners = [
  { key: "all", label: "All owners" },
  { key: "you", label: "You" },
  { key: "partner", label: "Partner" },
  { key: "shared", label: "Shared" },
] as const;

type Owner = (typeof owners)[number]["key"];

type Task = {
  id: string;
  title: string;
  owner: Owner;
  type: "routine" | "one-off" | "scheduled";
  timing: string;
  accent: string;
  status: "open" | "done" | "due";
  detail?: string;
};

const tasks: Task[] = [
  {
    id: "1",
    title: "Morning drop-off",
    owner: "you",
    type: "scheduled",
    timing: "Today · 8:10 am",
    accent: "#83c5be",
    status: "due",
    detail: "Traffic looks light · 20 min drive",
  },
  {
    id: "2",
    title: "Groceries top-up",
    owner: "shared",
    type: "one-off",
    timing: "Today · flexible",
    accent: "#e29578",
    status: "open",
    detail: "Budget left this week: $45",
  },
  {
    id: "3",
    title: "Laundry reset",
    owner: "partner",
    type: "routine",
    timing: "Auto-resets nightly",
    accent: "#006d77",
    status: "done",
    detail: "Completed 9:12 pm yesterday",
  },
  {
    id: "4",
    title: "Immunisation booking",
    owner: "you",
    type: "one-off",
    timing: "Due Friday",
    accent: "#83c5be",
    status: "open",
    detail: "Clinic holds 3 slots",
  },
  {
    id: "5",
    title: "Weekend planning",
    owner: "shared",
    type: "scheduled",
    timing: "Saturday · 15 min",
    accent: "#e29578",
    status: "open",
    detail: "Add playground + groceries",
  },
];

const routines: Task[] = [
  {
    id: "r1",
    title: "Bedtime routine",
    owner: "shared",
    type: "routine",
    timing: "Nightly · 7:30 pm",
    accent: "#83c5be",
    status: "open",
    detail: "Story + lights out",
  },
  {
    id: "r2",
    title: "Bin night",
    owner: "you",
    type: "routine",
    timing: "Tuesdays",
    accent: "#006d77",
    status: "open",
    detail: "Swap weeks for glass",
  },
];

const events: Task[] = [
  {
    id: "e1",
    title: "Childcare invoice",
    owner: "partner",
    type: "scheduled",
    timing: "Today · uploaded",
    accent: "#006d77",
    status: "open",
    detail: "Send claim tomorrow",
  },
  {
    id: "e2",
    title: "School sports day",
    owner: "shared",
    type: "scheduled",
    timing: "Thu 10:00 am",
    accent: "#83c5be",
    status: "open",
    detail: "Pack water + hat",
  },
];

const pillStyles: Record<Task["type"], string> = {
  routine: "bg-[#006d77]/10 text-[#006d77]",
  "one-off": "bg-[#e29578]/10 text-[#e29578]",
  scheduled: "bg-[#83c5be]/10 text-[#006d77]",
};

export function FamilyPreview() {
  const [owner, setOwner] = useState<Owner>("all");

  const filterTasks = useMemo(
    () =>
      (collection: Task[]) =>
        collection.filter((task) => owner === "all" || task.owner === owner),
    [owner],
  );

  const filteredTasks = filterTasks(tasks);
  const filteredRoutines = filterTasks(routines);
  const filteredEvents = filterTasks(events);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="rounded-2xl border border-white/5 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="flex flex-wrap items-center gap-3 pb-4">
          <div className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">Live preview</div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/50">Calm, daily clarity</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 pb-4">
          {owners.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setOwner(item.key)}
              className={`rounded-full border px-3 py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                owner === item.key
                  ? "border-white/80 bg-white/20 text-white"
                  : "border-white/10 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Today" subtitle="What needs doing">
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          </Card>

          <Card title="Routines" subtitle="Auto-resetting">
            <div className="space-y-3">
              {filteredRoutines.map((routine) => (
                <TaskRow key={routine.id} task={routine} />
              ))}
            </div>
          </Card>

          <Card title="Calendar" subtitle="Next anchors">
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <TaskRow key={event.id} task={event} />
              ))}
            </div>
          </Card>

          <Card title="Morning summary" subtitle="Sent at 7:00 am" tone="soft">
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Two items due today · drop-off and groceries</li>
              <li>• Laundry resets tonight · partner owns it</li>
              <li>• No overdue tasks · take the win ✨</li>
            </ul>
          </Card>
        </div>
      </section>

      <aside className="grid gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
        <h3 className="text-xl font-semibold text-white">Why this matters</h3>
        <p className="text-sm leading-relaxed text-white/80">
          Family OS keeps routine loops, one-off priorities, and scheduled moments in one calm view. Filters stay
          lightweight: pick an owner and everything else adapts. Morning summaries show just enough to start the day.
        </p>
        <div className="grid gap-3">
          {["Today view for actions", "Routines auto-reset", "Calendar stays in sync"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-white/80">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80">✓</span>
              <div className="text-sm">{item}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[#83c5be]/30 bg-[#83c5be]/10 p-4 text-[#f7fffd]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#83c5be]">Palette</div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <Swatch color="#006d77" label="Stormy Teal" />
            <Swatch color="#83c5be" label="Pearl Aqua" />
            <Swatch color="#edf6f9" label="Alice Blue" />
            <Swatch color="#ffddd2" label="Almond Silk" />
            <Swatch color="#e29578" label="Tangerine" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  tone = "default",
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  tone?: "default" | "soft";
}) {
  const isSoft = tone === "soft";
  return (
    <div
      className={`h-full rounded-xl border p-4 shadow-inner shadow-black/10 ${
        isSoft
          ? "border-white/5 bg-white/10"
          : "border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/0"
      }`}
    >
      <div className="flex items-center justify-between pb-3">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-white/60">{subtitle}</div>
        </div>
        {!isSoft && (
          <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Calm mode</div>
        )}
      </div>
      {children}
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      <span
        className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: `${task.accent}1A`, color: task.accent }}
      >
        {task.type === "routine" ? "R" : task.type === "one-off" ? "1×" : "Cal"}
      </span>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white">{task.title}</p>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${pillStyles[task.type]}`}>
            {task.type}
          </span>
        </div>
        <p className="text-xs text-white/70">{task.timing}</p>
        {task.detail && <p className="text-xs text-white/80">{task.detail}</p>}
      </div>
      <div className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] capitalize text-white/80">
        {task.status === "done" ? "done" : task.status}
      </div>
    </div>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
      <span className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export default FamilyPreview;
