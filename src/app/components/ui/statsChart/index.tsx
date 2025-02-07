import { useMemo } from "react";

interface StatPosition {
  name: string;
  labelPosition: { x: number; y: number };
  valuePosition: { x: number; y: number };
  anchor: "start" | "middle" | "end";
}

interface StatsChartProps {
  selectedPokemon: Pokemon | null;
}

export default function StatsChart({ selectedPokemon }: StatsChartProps) {
  const STAT_POSITIONS: StatPosition[] = [
    {
      name: "체력",
      labelPosition: { x: 100, y: 15 },
      valuePosition: { x: 100, y: 30 },
      anchor: "middle",
    },
    {
      name: "공격",
      labelPosition: { x: 170, y: 50 },
      valuePosition: { x: 170, y: 65 },
      anchor: "start",
    },
    {
      name: "방어",
      labelPosition: { x: 170, y: 120 },
      valuePosition: { x: 170, y: 135 },
      anchor: "start",
    },
    {
      name: "스피드",
      labelPosition: { x: 100, y: 155 },
      valuePosition: { x: 100, y: 170 },
      anchor: "middle",
    },
    {
      name: "특수방어",
      labelPosition: { x: 30, y: 120 },
      valuePosition: { x: 30, y: 135 },
      anchor: "end",
    },
    {
      name: "특수공격",
      labelPosition: { x: 30, y: 50 },
      valuePosition: { x: 30, y: 65 },
      anchor: "end",
    },
  ];

  const baseHexagonPoints = useMemo(() => {
    const points = [
      "100,0", // 상단
      "173.2,43", // 우상단
      "173.2,127", // 우하단
      "100,170", // 하단
      "26.8,127", // 좌하단
      "26.8,43", // 좌상단
    ];
    return points.join(" ");
  }, []);

  const statsPolygon = useMemo(() => {
    if (!selectedPokemon) return "";

    const maxStat = 255;
    const centerX = 100;
    const centerY = 85;
    const radius = 85;

    const orderedStats = [
      selectedPokemon.stats[0],
      selectedPokemon.stats[1],
      selectedPokemon.stats[2],
      selectedPokemon.stats[5],
      selectedPokemon.stats[4],
      selectedPokemon.stats[3],
    ];

    const angles = [270, 330, 30, 90, 150, 210].map((a) => (a * Math.PI) / 180);

    const points = orderedStats.map((stat, i) => {
      const ratio = stat.base_stat / maxStat;
      const r = radius * ratio;
      const x = centerX + r * Math.cos(angles[i]);
      const y = centerY + r * Math.sin(angles[i]);
      return `${x},${y}`;
    });

    return points.join(" ");
  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  return (
    <div className="relative w-full pb-[86.6%]">
      <svg viewBox="-20 -20 240 210" className="absolute inset-0 h-full w-full">
        {/* 중심에서 각 꼭짓점으로 가는 직선 */}
        <line
          x1="100"
          y1="85"
          x2="100"
          y2="0"
          stroke="#ddd"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="85"
          x2="173.2"
          y2="43"
          stroke="#ddd"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="85"
          x2="173.2"
          y2="127"
          stroke="#ddd"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="85"
          x2="100"
          y2="170"
          stroke="#ddd"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="85"
          x2="26.8"
          y2="127"
          stroke="#ddd"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="85"
          x2="26.8"
          y2="43"
          stroke="#ddd"
          strokeWidth="0.5"
        />

        {/* 기준 6각형 */}
        <polygon
          points={baseHexagonPoints}
          fill="none"
          stroke="#ddd"
          strokeWidth="0.5"
        />

        {/* 스탯 다각형 */}
        <polygon
          points={statsPolygon}
          fill="rgba(83, 164, 207, 0.5)"
          stroke="#53a4cf"
          strokeWidth="1"
        />

        {/* 스탯 라벨과 수치 */}
        {STAT_POSITIONS.map((pos, index) => (
          <g key={pos.name}>
            <text
              x={pos.labelPosition.x}
              y={pos.labelPosition.y}
              className="font-pokemon-xy text-[8px]"
              textAnchor={pos.anchor}
            >
              {pos.name}
            </text>
            <text
              x={pos.valuePosition.x}
              y={pos.valuePosition.y}
              className="font-pokemon-xy text-[8px]"
              textAnchor={pos.anchor}
            >
              {selectedPokemon.stats[index].base_stat}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
