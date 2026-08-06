import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Download, Plus, Search } from "lucide-react";
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type ButtonProps,
} from "@ss/portal-ui";

/** 文字按钮尺寸切换（icon 档随同高呈现，不单独成 Tab） */
type TextButtonSize = "xs" | "sm" | "default" | "lg";

const SIZE_OPTIONS: { value: TextButtonSize; label: string; spec: string }[] = [
  { value: "xs", label: "xs", spec: "24px · 12px 字" },
  { value: "sm", label: "sm", spec: "32px · 13px 字" },
  { value: "default", label: "default", spec: "36px · 14px 字" },
  { value: "lg", label: "lg", spec: "40px · 14px 字" },
];

const ICON_ONLY_SIZE: Record<TextButtonSize, NonNullable<ButtonProps["size"]>> = {
  xs: "icon-xs",
  sm: "icon-sm",
  default: "icon",
  lg: "icon-lg",
};

function glyphClass(size: TextButtonSize) {
  if (size === "xs") return "size-3";
  if (size === "sm") return "size-3.5";
  return "size-4";
}

function DetailBlock({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="portal-list-card flex flex-col gap-4 border border-gray-border-normal">
      <header>
        <h2 className="text-16 font-semibold text-gray-text-2">{title}</h2>
        {description ? <div className="mt-1.5 text-13 text-gray-text-5">{description}</div> : null}
      </header>
      {children}
    </section>
  );
}

function ColorVariantRow({
  name,
  className,
  usage,
  sample,
}: {
  name: string;
  className?: string;
  usage: string;
  sample: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-border-light py-4 last:border-b-0 last:pb-0 first:pt-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="min-w-0 sm:w-56 sm:shrink-0">
        <p className="text-14 font-semibold text-gray-text-2">{name}</p>
        {className ? <p className="mt-0.5 text-12 text-gray-text-7">{className}</p> : null}
      </div>
      <p className="min-w-0 flex-1 text-13 leading-relaxed text-gray-text-5">{usage}</p>
      <div className="flex shrink-0 flex-wrap items-center gap-3">{sample}</div>
    </div>
  );
}

/** Button 详情：变体 / 左右图标 / 尺寸切换 */
export function ButtonDetailExamples() {
  const [size, setSize] = useState<TextButtonSize>("default");
  const ic = glyphClass(size);
  const iconSize = ICON_ONLY_SIZE[size];
  const sizeMeta = SIZE_OPTIONS.find((o) => o.value === size)!;

  return (
    <div className="flex flex-col gap-4">
      <DetailBlock
        title="颜色 / 变体"
        description="每种颜色单独一行；右侧为默认与禁用示例，中间说明适用场景。"
      >
        <div className="flex flex-col">
          <ColorVariantRow
            name="品牌"
            className="portal-brand-btn · Button default"
            usage="页面主 CTA：提交、确认、创建等唯一或最高优先级操作。一屏通常只保留一个品牌主按钮。"
            sample={
              <>
                <button type="button" className="portal-brand-btn">
                  主操作
                </button>
                <button type="button" className="portal-brand-btn" disabled>
                  禁用
                </button>
              </>
            }
          />
          <ColorVariantRow
            name="黑色"
            className="portal-black-btn · Button black"
            usage="次级强调 CTA：与主品牌按钮并列时的第二重点，或中性场景下的强操作（如下载、发布），避免与品牌绿抢主视觉。"
            sample={
              <>
                <button type="button" className="portal-black-btn">
                  次级强调
                </button>
                <button type="button" className="portal-black-btn" disabled>
                  禁用
                </button>
              </>
            }
          />
          <ColorVariantRow
            name="Outline"
            className="Button outline"
            usage="次要操作：取消、返回列表、次要筛选确认等。有边框、无填充，用于与主按钮成对出现时的弱侧。"
            sample={
              <>
                <Button variant="outline">次要操作</Button>
                <Button variant="outline" disabled>
                  禁用
                </Button>
              </>
            }
          />
          <ColorVariantRow
            name="Ghost"
            className="Button ghost"
            usage="三级 / 轻量操作：工具栏、行内辅助、「更多」旁的低干扰入口。无边框，依赖 hover 反馈。"
            sample={
              <>
                <Button variant="ghost">轻量操作</Button>
                <Button variant="ghost" disabled>
                  禁用
                </Button>
              </>
            }
          />
        </div>
      </DetailBlock>

      <DetailBlock
        title="@ss/portal-ui Button · 尺寸"
        description={
          <>
            <code className="text-13">size</code>：xs / sm / default / lg。纯图标用同高的{" "}
            <code className="text-13">icon-*</code>（随档位一并展示）。
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="按钮尺寸">
          {SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={
                size === opt.value
                  ? "portal-tab-item portal-tab-item--active py-1.5 text-14"
                  : "portal-tab-item py-1.5 text-14"
              }
              aria-pressed={size === opt.value}
              onClick={() => setSize(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-border-light pt-4">
          <div>
            <p className="mb-2 text-12 font-medium text-gray-text-5">文字 + 图标</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size={size}>
                <Plus className={ic} strokeWidth={1.75} aria-hidden />
                主操作
              </Button>
              <Button size={size} variant="black">
                <Download className={ic} strokeWidth={1.75} aria-hidden />
                黑色
              </Button>
              <Button size={size} variant="outline">
                Outline
              </Button>
              <Button size={size} variant="ghost">
                Ghost
                <ArrowRight className={ic} strokeWidth={1.75} aria-hidden />
              </Button>
              <Button size={size} disabled>
                禁用
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-12 font-medium text-gray-text-5">
              纯图标 · <code className="text-12">size=&quot;{iconSize}&quot;</code>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size={iconSize} aria-label="搜索">
                <Search className={ic} strokeWidth={1.75} />
              </Button>
              <Button size={iconSize} variant="black" aria-label="下载">
                <Download className={ic} strokeWidth={1.75} />
              </Button>
              <Button size={iconSize} variant="outline" aria-label="更多">
                <ChevronDown className={ic} strokeWidth={1.75} />
              </Button>
              <Button size={iconSize} variant="ghost" aria-label="添加">
                <Plus className={ic} strokeWidth={1.75} />
              </Button>
            </div>
          </div>
        </div>
        <p className="text-12 text-gray-text-7">
          当前 <code className="text-12">size=&quot;{size}&quot;</code> · {sizeMeta.spec}
        </p>
      </DetailBlock>

      <DetailBlock
        title="左右图标排列"
        description="左图标（引导操作）· 右图标（展开 / 前进）；与尺寸切换无关，固定 default。"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <Plus className="size-4" strokeWidth={1.75} aria-hidden />
              左侧图标
            </Button>
            <Button variant="black">
              <Search className="size-4" strokeWidth={1.75} aria-hidden />
              搜索
            </Button>
            <Button variant="outline">
              <Download className="size-4" strokeWidth={1.75} aria-hidden />
              导出
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              右侧图标
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="black">
                  更多
                  <ChevronDown className="size-4" strokeWidth={1.75} aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[144px]">
                <DropdownMenuItem>编辑</DropdownMenuItem>
                <DropdownMenuItem>复制链接</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">取消询价</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              下一步
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <Plus className="size-4" strokeWidth={1.75} aria-hidden />
              双侧
              <ChevronDown className="size-4" strokeWidth={1.75} aria-hidden />
            </Button>
            <Button size="icon" variant="outline" aria-label="仅图标">
              <Search className="size-4" strokeWidth={1.75} />
            </Button>
          </div>
        </div>
      </DetailBlock>

      <DetailBlock
        title="Button Group"
        description={
          <>
            <code className="text-13">ButtonGroup</code> 将相关按钮拼成一组；outline
            靠共享边框衔接，实心按钮用 <code className="text-13">ButtonGroupSeparator</code>
            。对齐{" "}
            <a
              className="text-13 font-medium text-portal-text-link underline underline-offset-2"
              href="https://ui.shadcn.com/docs/components/base/button-group"
              target="_blank"
              rel="noreferrer"
            >
              shadcn Button Group
            </a>
            ，样式全部走 portal token。
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-13 font-medium text-gray-text-4">Outline 拼接</p>
            <ButtonGroup aria-label="邮件操作">
              <Button variant="outline">归档</Button>
              <Button variant="outline">报告</Button>
              <Button variant="outline">稍后</Button>
            </ButtonGroup>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-13 font-medium text-gray-text-4">Split · 品牌 + 下拉</p>
            <ButtonGroup aria-label="创建操作">
              <Button>
                <Plus className="size-4" strokeWidth={1.75} aria-hidden />
                创建
              </Button>
              <ButtonGroupSeparator />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" aria-label="更多创建选项">
                    <ChevronDown className="size-4" strokeWidth={1.75} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>从模板创建</DropdownMenuItem>
                  <DropdownMenuItem>导入</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-13 font-medium text-gray-text-4">嵌套组 · 间距</p>
            <ButtonGroup aria-label="工具栏">
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="搜索">
                  <Search className="size-4" strokeWidth={1.75} />
                </Button>
                <Button variant="outline" size="icon" aria-label="下载">
                  <Download className="size-4" strokeWidth={1.75} />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">筛选</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      更多
                      <ChevronDown className="size-4" strokeWidth={1.75} aria-hidden />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[144px]">
                    <DropdownMenuItem>编辑</DropdownMenuItem>
                    <DropdownMenuItem>复制链接</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">取消询价</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ButtonGroup>
            </ButtonGroup>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-13 font-medium text-gray-text-4">带 Text</p>
              <ButtonGroup aria-label="价格">
                <ButtonGroupText>CNY</ButtonGroupText>
                <Button variant="outline">支付</Button>
              </ButtonGroup>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-13 font-medium text-gray-text-4">纵向</p>
              <ButtonGroup orientation="vertical" aria-label="纵向操作">
                <Button variant="outline">上</Button>
                <Button variant="outline">中</Button>
                <Button variant="outline">下</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </DetailBlock>
    </div>
  );
}
