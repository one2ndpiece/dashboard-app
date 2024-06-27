'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger
} from 'src/components/ui/alert-dialog';


// 型定義
interface ItemStat {
  [key: string]: number;
}

interface Item {
  id: number;
  name: string;
  cost: number;
  description: string;
  stats: ItemStat;
}

// SAMPLE_ITEMS の定義
const SAMPLE_ITEMS: Item[] = [
  { id: 1, name: 'Infinity Edge', cost: 3400, description: 'Critically strike for more damage.', stats: { attackDamage: 70, criticalStrike: 20 } },
  { id: 2, name: 'Rabadon\'s Deathcap', cost: 3600, description: 'Increases Ability Power by 35%', stats: { abilityPower: 120 } },
  { id: 3, name: 'Thornmail', cost: 2700, description: 'Reflects damage to attackers.', stats: { armor: 80 } },
  { id: 4, name: 'Void Staff', cost: 2700, description: 'Magic damage partially ignores target\'s magic resistance.', stats: { abilityPower: 65, magicPenetration: 40 } },
  { id: 5, name: 'Blade of the Ruined King', cost: 3200, description: 'Deals current health damage on hit.', stats: { attackDamage: 40, attackSpeed: 25, lifesteal: 12 } },
];

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card
          className={`w-64 m-2 bg-gray-800 text-white border border-gray-700 shadow-md transition-all duration-300 cursor-pointer ${isHovered ? 'shadow-lg scale-105' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardHeader>
            <CardTitle className="text-blue-400">{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">Cost: {item.cost} gold</p>
            <p className="mt-2 text-gray-300">{item.description}</p>
            <div className="mt-2">
              <strong className="text-blue-400">Stats:</strong>
              <ul className="list-disc list-inside text-gray-300">
                {Object.entries(item.stats).map(([stat, value]) => (
                  <li key={stat}>{stat}: <span className="text-blue-300">{value}</span></li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent className='text-gray-300 bg-gray-800 rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle>{item.name}</AlertDialogTitle>
          <AlertDialogDescription >
            <p>Cost: {item.cost} gold</p>
            <p>{item.description}</p>
            <strong>Stats:</strong>
            <ul>
              {Object.entries(item.stats).map(([stat, value]) => (
                <li key={stat}>{stat}: {value}</li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ItemList: React.FC<{ items: Item[] }> = ({ items }) => (
  <div className="flex flex-wrap justify-center">
    {items.map(item => (
      <ItemCard key={item.id} item={item} />
    ))}
  </div>
);

const ItemsDashboard: React.FC = () => {
  const [selectedStats, setSelectedStats] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<'name' | 'cost'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleStatChange = (stat: string) => {
    setSelectedStats(prev => ({ ...prev, [stat]: !prev[stat] }));
  };

  const handleSort = (field: 'name' | 'cost') => {
    if (field === sortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredItems = SAMPLE_ITEMS.filter(item => {
    if (Object.keys(selectedStats).length === 0) return true;
    return Object.keys(selectedStats).some(stat =>
      selectedStats[stat] && stat in item.stats
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost;
    }
  });

  const allStats = [...new Set(SAMPLE_ITEMS.flatMap(item => Object.keys(item.stats)))];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">League of Legends Items</h1>

        <div className="mb-8 bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Filter by Stats</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {allStats.map(stat => (
              <Button
                key={stat}
                onClick={() => handleStatChange(stat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  ${selectedStats[stat]
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-transparent text-blue-300 border border-blue-500 hover:bg-blue-500 hover:text-white'}
                  transition-colors duration-300
                `}
              >
                {stat}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-300">Sort by:</span>
            <Button
              onClick={() => handleSort('name')}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                ${sortBy === 'name'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-transparent text-blue-300 border border-blue-500 hover:bg-blue-500 hover:text-white'}
                transition-colors duration-300
              `}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Button>
            <Button
              onClick={() => handleSort('cost')}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                ${sortBy === 'cost'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-transparent text-blue-300 border border-blue-500 hover:bg-blue-500 hover:text-white'}
                transition-colors duration-300
              `}
            >
              Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Button>
          </div>
        </div>

        <ItemList items={sortedItems} />
      </div>
    </div>
  );
};

export default ItemsDashboard;


