import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Label, Input, Slider } from '@/ui/components';
import type { IdentificationParams } from '@/primitives';

interface SettingsPanelProps {
  params: IdentificationParams;
  onChange: (params: IdentificationParams) => void;
  disabled?: boolean;
}

export function SettingsPanel({ params, onChange, disabled }: SettingsPanelProps) {
  const handleTopKChange = (value: number[]) => {
    onChange({ ...params, topK: value[0] });
  };

  const handleSimilarityChange = (value: number[]) => {
    onChange({ ...params, minSimilarity: value[0] });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detection Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Top Matches</Label>
            <span className="text-muted-foreground text-sm">{params.topK}</span>
          </div>
          <Slider
            value={[params.topK]}
            min={1}
            max={20}
            step={1}
            onValueChange={handleTopKChange}
            disabled={disabled}
          />
          <p className="text-muted-foreground text-xs">
            Maximum number of matches to return per detection.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Minimum Similarity</Label>
            <span className="text-muted-foreground text-sm">
              {Math.round(params.minSimilarity * 100)}%
            </span>
          </div>
          <Slider
            value={[params.minSimilarity]}
            min={0}
            max={1}
            step={0.05}
            onValueChange={handleSimilarityChange}
            disabled={disabled}
          />
          <p className="text-muted-foreground text-xs">
            Filter matches below this similarity threshold.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
