import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlanCard from "../PlanCard";
import { CheckIcon, MinusIcon } from "lucide-react";
import { planFeatures, PlanList } from "@/utils/constants";

export default function SectionPricing() {
  return (
    <div className="container mx-auto px-4 lg:px-0 max-w-7xl py-24 lg:py-32">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Pricing
        </h2>
        <p className="mt-1 text-muted-foreground">
          Whatever your status, our offers evolve according to your needs.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center">
        {PlanList.map(plan => (
          <PlanCard
            key={plan._id}
            isTrial={true}
            plan={plan}
            dummy={true}
            popular={plan._id === "1" ? true : false}
          />
        ))}
      </div>

      <div className="mt-20 lg:mt-32">
        <div className="text-center mb-10 lg:mb-20">
          <h3 className="text-2xl font-semibold dark:text-white">
            Compare plans
          </h3>
        </div>

        <Table className="table">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead className="w-3/12 text-primary">Plans</TableHead>
              {PlanList.map(plan => (
                <TableHead className="w-2/12 text-primary text-lg font-medium text-center">
                  {plan.planName}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {planFeatures.map((featureType) => (
              <React.Fragment key={featureType.type}>
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={5} className="font-bold">
                    {featureType.type}
                  </TableCell>
                </TableRow>
                {featureType.features.map((feature) => (
                  <TableRow key={feature.name} className="text-muted-foreground">
                    <TableCell>{feature.name}</TableCell>
                    {PLAN_TIERS.map((tier) => (
                      <TableCell key={tier}>
                        <PlanCheck available={feature[tier]} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}

const PlanCheck: React.FC<{ available: boolean }> = ({ available }) => (
  <div className="mx-auto w-min">
    {available ? <CheckIcon className="h-5 w-5" /> : <MinusIcon className="h-5 w-5" />}
  </div>
);

const PLAN_TIERS = ["free", "standard", "enterprise"] as const;
