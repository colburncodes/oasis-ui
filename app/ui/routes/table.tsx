import { lusitana } from '@/app/ui/font';
import Search from '@/app/ui/search';
import { RouteTableType } from '@/app/lib/definitions';

export default async function RoutesTable({ routes }: { routes: RouteTableType }) {
    return (
        <div className="w-full">
            <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                Routes
            </h1>
            <Search placeholder="Search routes..." />
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                            <div className="md:hidden">
                                {routes?.map((route) => (
                                    <div
                                        key={route.id}
                                        className="mb-2 w-full rounded-md bg-white p-4"
                                    >
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div>
                                                <div className="mb-2 flex items-center">
                                                    <p className="font-medium">{route.name}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {route.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between border-b py-5">
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Driver</p>
                                                <p className="font-medium">{route.driver_name || 'Unassigned'}</p>
                                            </div>
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Status</p>
                                                <p className="font-medium">{route.status}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 text-sm">
                                            <p>{route.total_stores} stores ({route.total_active_stores} active)</p>
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
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Driver
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-5 font-medium">
                                        Stores
                                    </th>
                                    <th scope="col" className="px-4 py-5 font-medium">
                                        Last Updated
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-900">
                                {routes.map((route) => (
                                    <tr key={route.id} className="group">
                                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                            {route.name}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {route.description}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {route.driver_name || 'Unassigned'}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {route.status}
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                                            {route.total_stores} ({route.total_active_stores} active)
                                        </td>
                                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                            {route.last_update_date}
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