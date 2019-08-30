export class HierarchicalNavigationConfiguration {
  children?: HierarchicalNavigationNodeConfiguration;
}

export class HierarchicalNavigationNodeConfiguration {
  propertyIri: string;
  propertyDirection: string;
  routeKey: string;
  children?: HierarchicalNavigationNodeConfiguration;
  sortByPropertyIri?: string;
}
