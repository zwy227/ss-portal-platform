import { useMemo, useState } from "react";
import { MapPin, Warehouse } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  PortalAddressSearchField,
  type PortalAddressCompactSummaryParts,
  type PortalAddressSearchResult,
  type PortalAddressSearchSelected,
} from "@ss/portal-ui";

type DemoPlace = {
  id: string;
  badge: string;
  title: string;
  city: string;
  region: string;
  postal: string;
  street: string;
  kind: "warehouse" | "address";
};

const DEMO_PLACES: DemoPlace[] = [
  {
    id: "ss-lax-01",
    badge: "SS仓",
    title: "SS LAX-01",
    city: "Los Angeles",
    region: "CA",
    postal: "90058",
    street: "2500 S Santa Fe Ave",
    kind: "warehouse",
  },
  {
    id: "fba-ont8",
    badge: "FBA",
    title: "ONT8",
    city: "Ontario",
    region: "CA",
    postal: "91761",
    street: "24300 Nandina Ave",
    kind: "warehouse",
  },
  {
    id: "commercial-01",
    badge: "商业",
    title: "Acme Distribution",
    city: "Commerce",
    region: "CA",
    postal: "90040",
    street: "5800 Sheila St",
    kind: "address",
  },
  {
    id: "residential-01",
    badge: "住宅",
    title: "Home Delivery",
    city: "Irvine",
    region: "CA",
    postal: "92618",
    street: "100 Spectrum Center Dr",
    kind: "address",
  },
];

const EMPTY_HINTS = ["LAX", "ONT8", "90058", "Irvine"] as const;

function toSummary(place: DemoPlace): PortalAddressCompactSummaryParts {
  const regionLabel = `${place.city}, ${place.region}`;
  const fullTitle = `${place.title} · ${regionLabel} · ${place.street}`;
  return {
    primary: place.title,
    tail: `${regionLabel} · ${place.street}`,
    tailSegments: [
      { text: place.city, emphasized: true },
      { text: `, ${place.region}`, emphasized: false },
      { text: " · ", emphasized: false },
      { text: place.street, emphasized: false },
    ],
    fullTitle,
  };
}

function toResult(place: DemoPlace): PortalAddressSearchResult {
  return {
    id: place.id,
    badge: place.badge,
    summary: toSummary(place),
  };
}

function toSelected(place: DemoPlace): PortalAddressSearchSelected {
  return {
    badge: place.badge,
    summary: toSummary(place),
    icon:
      place.kind === "warehouse" ? (
        <Warehouse className="size-5" strokeWidth={1.75} aria-hidden />
      ) : (
        <MapPin className="size-5" strokeWidth={1.75} aria-hidden />
      ),
    ariaLabel: "已选派送地",
  };
}

function filterPlaces(query: string): DemoPlace[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return DEMO_PLACES.filter((place) =>
    [place.id, place.title, place.badge, place.city, place.region, place.postal, place.street]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

/** 可交互：搜索下拉 + 地址簿 + 自定义录入入口 */
export function AddressSearchInteractiveExample() {
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<DemoPlace | null>(null);
  const [open, setOpen] = useState(false);
  const [addressBookOpen, setAddressBookOpen] = useState(false);
  const [customNote, setCustomNote] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const results = useMemo(() => filterPlaces(query).map(toResult), [query]);

  const selectPlace = (id: string) => {
    const place = DEMO_PLACES.find((item) => item.id === id) ?? null;
    setSelectedPlace(place);
    setQuery(place?.title ?? "");
    setOpen(false);
    setAddressBookOpen(false);
    setCustomNote(null);
    setShowError(false);
  };

  const clear = () => {
    setSelectedPlace(null);
    setQuery("");
    setOpen(false);
    setAddressBookOpen(false);
    setShowError(false);
  };

  return (
    <div className="flex max-w-xl flex-col gap-4">
      <PortalAddressSearchField
        label="派送地址"
        value={query}
        placeholder="搜索城市、邮编、仓库编码或地址"
        selected={selectedPlace ? toSelected(selectedPlace) : null}
        results={results}
        open={open}
        addressBookOpen={addressBookOpen}
        addressBookTitle="选择派送地"
        addressBookTooltip="选择派送地"
        customEntryFooter
        emptyHints={EMPTY_HINTS}
        error={showError && !selectedPlace}
        errorMessage="请填写并选择派送地"
        onChange={(next) => {
          setQuery(next);
          setSelectedPlace(null);
          setAddressBookOpen(false);
          setOpen(Boolean(next.trim()));
          setCustomNote(null);
        }}
        onFocus={() => setOpen(Boolean(query.trim()) && !selectedPlace)}
        onClear={clear}
        onSelect={selectPlace}
        onAddressBookOpen={() => {
          setOpen(false);
          setAddressBookOpen(true);
        }}
        onAddressBookClose={() => setAddressBookOpen(false)}
        onCustomEntryStart={() => {
          setOpen(false);
          setAddressBookOpen(false);
          setSelectedPlace(null);
          setQuery("");
          setCustomNote("已触发自定义录入（演示：业务侧打开自定义地址弹窗）");
        }}
        onDismiss={() => setOpen(false)}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-gray-border-strong bg-background px-3 py-1.5 text-13 font-medium text-gray-text-4 transition hover:bg-gray-fill-light"
          onClick={() => setShowError(true)}
        >
          校验错误态
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-border-strong bg-background px-3 py-1.5 text-13 font-medium text-gray-text-4 transition hover:bg-gray-fill-light"
          onClick={clear}
        >
          重置
        </button>
      </div>

      {customNote ? <p className="m-0 text-13 text-gray-text-5">{customNote}</p> : null}

      <Dialog open={addressBookOpen} onOpenChange={setAddressBookOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>选择派送地</DialogTitle>
            <DialogDescription>演示地址簿：点选条目回填到搜索字段。</DialogDescription>
          </DialogHeader>
          <ul className="m-0 flex max-h-[280px] list-none flex-col gap-1 overflow-y-auto p-0">
            {DEMO_PLACES.map((place) => (
              <li key={place.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md border border-gray-border-light px-3 py-2.5 text-left transition hover:bg-gray-fill-light"
                  onClick={() => selectPlace(place.id)}
                >
                  <span className="inline-flex shrink-0 rounded-sm bg-gray-fill-normal px-2 py-0.5 text-12 font-semibold text-gray-text-5">
                    {place.badge}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-13 text-gray-text-2">
                    <span className="font-semibold">{place.title}</span>
                    <span className="text-gray-text-7">
                      {" "}
                      · {place.city}, {place.region}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/** 已选中态（静态预览） */
export function AddressSearchSelectedExample() {
  const place = DEMO_PLACES[0]!;
  return (
    <div className="max-w-xl">
      <PortalAddressSearchField
        label="派送地址"
        value={place.title}
        placeholder="搜索城市、邮编、仓库编码或地址"
        selected={toSelected(place)}
        results={[]}
        open={false}
        onChange={() => undefined}
        onClear={() => undefined}
        onSelect={() => undefined}
      />
    </div>
  );
}

/** 只读态 */
export function AddressSearchReadonlyExample() {
  const place = DEMO_PLACES[1]!;
  return (
    <div className="max-w-xl">
      <PortalAddressSearchField
        label="派送地址"
        value={place.title}
        placeholder="搜索城市、邮编、仓库编码或地址"
        selected={toSelected(place)}
        results={[]}
        open={false}
        readOnly
        onChange={() => undefined}
        onClear={() => undefined}
        onSelect={() => undefined}
      />
    </div>
  );
}
