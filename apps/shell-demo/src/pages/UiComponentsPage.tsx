import type { ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
} from "@ss/portal-ui";
import { StyleGuidePage, StyleGuideSection, StyleGuideShell } from "../style-guide/StyleGuideShell";
import { UiAntFilterExamples } from "../style-guide/UiAntFilterExamples";
import { UiSelectionCardExamples } from "../style-guide/UiSelectionCardExamples";
import { UiTableExamples } from "../style-guide/UiTableExamples";
import { UiFocusStyleExamples } from "../style-guide/FocusStyleExamples";

function CompareRow({ portal, ui }: { portal: ReactNode; ui: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="mb-2 text-12 font-medium text-gray-text-5">portal-*（现有）</p>
        {portal}
      </div>
      <div>
        <p className="mb-2 text-12 font-medium text-gray-text-5">@ss/portal-ui（shadcn）</p>
        {ui}
      </div>
    </div>
  );
}

export function UiComponentsPage() {
  return (
    <StyleGuideShell>
      <StyleGuidePage
        title="Portal UI"
        description="@ss/portal-ui：Radix Primitives + shadcn 命名，样式来自 @ss/portal-tokens。新业务优先 import 本包组件；portal-* 组合类逐步对照迁移。"
      >
        <StyleGuideSection title="Focus 样式 · Input focusStyle">
          <UiFocusStyleExamples />
        </StyleGuideSection>

        <StyleGuideSection title="Button · portal-brand-btn">
          <CompareRow
            portal={
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="portal-brand-btn">
                  主操作
                </button>
                <button type="button" className="portal-brand-btn" disabled>
                  禁用
                </button>
              </div>
            }
            ui={
              <div className="flex flex-wrap items-center gap-3">
                <Button>主操作</Button>
                <Button disabled>禁用</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            }
          />
        </StyleGuideSection>

        <StyleGuideSection title="Input · portal-filter-input">
          <CompareRow
            portal={
              <div className="relative max-w-xs">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input type="search" className="portal-filter-input" placeholder="搜索订单号…" />
              </div>
            }
            ui={
              <div className="flex max-w-xs flex-col gap-2">
                <Label htmlFor="ui-search">关键词</Label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 portal-filter-icon"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <Input id="ui-search" type="search" className="pl-9" placeholder="搜索订单号…" />
                </div>
              </div>
            }
          />
        </StyleGuideSection>

        <StyleGuideSection title="DropdownMenu · portal-dropdown-*">
          <CompareRow
            portal={
              <div className="portal-dropdown-menu portal-dropdown-menu--wide max-w-[180px]">
                <div className="portal-dropdown-item">编辑</div>
                <div className="portal-dropdown-item">复制链接</div>
                <div className="portal-dropdown-item portal-dropdown-item--cancel">取消询价</div>
              </div>
            }
            ui={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    操作
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[144px]">
                  <DropdownMenuItem>编辑</DropdownMenuItem>
                  <DropdownMenuItem>复制链接</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">取消询价</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        </StyleGuideSection>

        <StyleGuideSection title="Dialog">
          <div className="max-w-xs">
            <Dialog>
              <DialogTrigger asChild>
                <Button>打开对话框</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>确认提交</DialogTitle>
                  <DialogDescription>提交后将进入审核流程，是否继续？</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button>确定</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </StyleGuideSection>

        <StyleGuideSection title="筛选器 · Ant Select / Cascader">
          <UiAntFilterExamples />
        </StyleGuideSection>

        <StyleGuideSection title="卡片选择 · Radio / Checkbox">
          <UiSelectionCardExamples />
        </StyleGuideSection>

        <StyleGuideSection title="Table 原语">
          <p className="mb-3 text-13 text-gray-text-5">
            「订单状态 / 待办」列对齐 SSLTLDemo 订单管理列表：有待办 → warning Badge + 橙色待办链接；无待办 → info Badge。
          </p>
          <UiTableExamples />
        </StyleGuideSection>

        <StyleGuideSection title="接入方式">
          <div className="portal-list-card flex flex-col gap-2 p-4">
            <p className="text-14 text-gray-text-4">
              依赖 <code className="text-13">@ss/portal-tokens</code> +{" "}
              <code className="text-13">@ss/portal-ui</code>，Tailwind 扫描需包含{" "}
              <code className="text-13">packages/ui/src</code>。
            </p>
            <pre className="overflow-x-auto rounded-md bg-page-bg p-3 text-13 text-gray-text-3">{`import {
  Button,
  PortalAntSelect,
  PortalAntCascader,
  PortalCheckboxCard,
  PortalRadioCard,
  PortalTable,
} from "@ss/portal-ui";`}</pre>
          </div>
        </StyleGuideSection>
      </StyleGuidePage>
    </StyleGuideShell>
  );
}
