import React, { useMemo } from "react";
import { motion } from "framer-motion";
import dagre from "dagre";

export default function AutoLayoutSchemaDiagram({ tables = [], relationships = [] }) {
  const { nodes, edges } = useMemo(() => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: "LR", nodesep: 50, ranksep: 100 });
    g.setDefaultEdgeLabel(() => ({}));

    tables.forEach((table) => {
      g.setNode(table.name, { label: table.name, width: 120, height: 60 });
    });

    relationships.forEach((rel) => {
      g.setEdge(rel.from, rel.to);
    });

    dagre.layout(g);

    return {
      nodes: g.nodes().map((v) => ({ ...g.node(v), id: v })),
      edges: g.edges().map((e) => ({ from: e.v, to: e.w })),
    };
  }, [tables, relationships]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl font-bold text-center text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Schema Diagram
        </motion.h2>

        <div className="relative bg-white border rounded-xl shadow-md p-8 overflow-auto" style={{ height: "500px" }}>
          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute bg-blue-50 border border-blue-300 rounded-lg px-3 py-2 text-xs text-center shadow"
              style={{
                left: node.x - node.width / 2,
                top: node.y - node.height / 2,
                width: node.width,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {node.label}
            </motion.div>
          ))}

          {/* Edges */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {edges.map((edge, i) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              return (
                <line
                  key={i}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#4B5563"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="5"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#4B5563" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
