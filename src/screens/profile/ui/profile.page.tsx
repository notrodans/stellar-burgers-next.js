// import { OrderCard } from "~/widgets/order-card";
// import { useSession } from "~/entities/session";
// import { API_ENTRYPOINTS, CONSTANTS_MAP } from "~/shared/constants";
// import { Paragraph, ScrollArea } from "~/shared/ui";
// import { useGetStreamingOrderQuery } from "~/entities/order";

// export const ProfileOrdersPage: React.FC = () => {
//   const session = useSession((s) => s.currentSession);
//   const { errorText, loadingText } = CONSTANTS_MAP.pages.profile.orders;
//   const { data } = useGetStreamingOrderQuery(
//     API_ENTRYPOINTS.GET_STREAMING_USER_ORDERS +
//       `?token=${session?.accessToken}`,
//   );
//
//   if (!data || (data && data.success === undefined)) {
//     return <Paragraph className="text-center">{loadingText}</Paragraph>;
//   }
//
//   if (data && !data.success) {
//     return (
//       <Paragraph variant="error" className="text-center">
//         {errorText}
//       </Paragraph>
//     );
//   }
//
//   if (data && data.success) {
//     return (
//       <>
//         {data && (
//           <ScrollArea size="long" className="flex flex-col lg:basis-1/2">
//             {data.orders.map((item) => (
//               <OrderCard
//                 key={item.number}
//                 ingredients={item.ingredients}
//                 status={item.status}
//                 name={item.name}
//                 number={item.number}
//                 createdAt={item.createdAt}
//               />
//             ))}
//           </ScrollArea>
//         )}
//       </>
//     );
//   }
// };

export function ProfileOrdersPage() {
  return <div>Profile</div>;
}
