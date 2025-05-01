
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as d3 from 'd3';

interface Node {
  id: string;
  name: string;
  difficulty: number;
  category: string;
  description?: string;
}

interface Link {
  source: string;
  target: string;
  type: string;
}

interface ConceptMapProps {
  width?: number;
  height?: number;
}

// Mock data - in a real app, this would come from the Neo4j database
const mockNodes: Node[] = [
  { id: 'arrays', name: 'Arrays', difficulty: 1, category: 'data_structure' },
  { id: 'linked_lists', name: 'Linked Lists', difficulty: 2, category: 'data_structure' },
  { id: 'stacks', name: 'Stacks', difficulty: 2, category: 'data_structure' },
  { id: 'queues', name: 'Queues', difficulty: 2, category: 'data_structure' },
  { id: 'recursion', name: 'Recursion', difficulty: 3, category: 'technique' },
  { id: 'searching', name: 'Searching', difficulty: 2, category: 'algorithm' },
  { id: 'sorting', name: 'Sorting', difficulty: 2, category: 'algorithm' },
  { id: 'trees', name: 'Trees', difficulty: 3, category: 'data_structure' },
];

const mockLinks: Link[] = [
  { source: 'arrays', target: 'linked_lists', type: 'prerequisite' },
  { source: 'arrays', target: 'sorting', type: 'prerequisite' },
  { source: 'arrays', target: 'searching', type: 'prerequisite' },
  { source: 'linked_lists', target: 'stacks', type: 'prerequisite' },
  { source: 'linked_lists', target: 'queues', type: 'prerequisite' },
  { source: 'arrays', target: 'recursion', type: 'prerequisite' },
  { source: 'recursion', target: 'trees', type: 'prerequisite' },
];

const ConceptMap = ({ width = 600, height = 400 }: ConceptMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const g = svg.append('g');

    // Add zoom functionality
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(mockLinks)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.8);

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(mockNodes)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes
    node.append('circle')
      .attr('r', (d) => 12 + d.difficulty * 2)
      .attr('fill', (d) => {
        switch (d.category) {
          case 'data_structure': return '#3b82f6';
          case 'algorithm': return '#10b981';
          case 'technique': return '#8b5cf6';
          default: return '#6b7280';
        }
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Add labels
    node.append('text')
      .attr('dx', 0)
      .attr('dy', (d) => 16 + d.difficulty * 2)
      .attr('text-anchor', 'middle')
      .text((d) => d.name)
      .attr('font-size', '11px')
      .attr('fill', '#1e293b')
      .attr('pointer-events', 'none');

    simulation
      .nodes(mockNodes as any)
      .on('tick', ticked);

    (simulation.force('link') as d3.ForceLink<any, any>)
      .links(mockLinks);

    function ticked() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Add tooltip on hover
    node.append('title')
      .text((d) => `${d.name}\nDifficulty: ${d.difficulty}/5\nCategory: ${d.category}`);

    return () => {
      simulation.stop();
    };
  }, [width, height]);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>DSA Concept Map</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="data_structure">Data Structures</SelectItem>
              <SelectItem value="algorithm">Algorithms</SelectItem>
              <SelectItem value="technique">Techniques</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="border rounded-md overflow-hidden">
          <svg ref={svgRef} width={width} height={height} className="bg-zinc-50" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-1"></div>
            <span>Data Structure</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#10b981] mr-1"></div>
            <span>Algorithm</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-1"></div>
            <span>Technique</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptMap;
