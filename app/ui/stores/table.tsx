import Image from 'next/image';
import { lusitana } from '@/app/ui/font';
import Search from '@/app/ui/search';
import { StoreTableType } from '@/app/lib/definitions';

export default async function StoresTable({ stores }: { stores: StoreTableType }) {
    return (
        <div className="w-full">
            <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                Stores
            </h1>
            <Search placeholder="Search stores..." />
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                            <div className="md:hidden">
                                {stores?.map((store) => (
                                    <div
                                        key={store.id}
                                        className="mb-2 w-full rounded-md bg-white p-4"
                                    >
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div>
                                                <div className="mb-2 flex items-center">
                                                    <div className="flex items-center gap-3">
                                                        <Image
                                                            src={store.image_url}
                                                            className="rounded-full"
                                                            alt={`${store.name}'s image`}
                                                            width={28}
                                                            height={28}
                                                        />
                                                        <p>{store.name}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {store.address}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between border-b py-5">
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Route</p>
                                                <p className="font-medium">{store.route_name || 'Unassigned'}</p>
                                            </div>
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Status</p>
                                                <p className="font-medium">{store.status}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 text-sm">
                                            <p>Next Delivery: {store.next_delivery_date || 'Not scheduled'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Address
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Route
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-5 font-medium">
                                        Next Delivery
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-900">
                                {stores.map((store) => (
                                    <tr key={store.id} className="group">
                                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={store.image_url}
                                                    className="rounded-full"
                                                    alt={`${store.name}'s image`}
                                                    width={28}
                                                    height={28}
                                                />
                                                <p>{store.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {store.address}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {store.route_name || 'Unassigned'}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {store.status}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                            {store.next_delivery_date || 'Not scheduled'}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}