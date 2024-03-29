"use client"
import React, { useEffect, useState, Fragment, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Menu, Dialog, Transition, Switch } from "@headlessui/react"
import { CgRemove, CgAdd } from "react-icons/cg"
import { IoSearch } from "react-icons/io5"
import { bool } from "prop-types"

interface Reward {
    _id: string
    reward_name: string
    expiry: string
    cap: number
    status: boolean
    brand_name: string
}

interface APIResponse {
    status: number
    data: Reward[]
}

interface Condition {
    condition: string
}

interface Freebie {
    quantity: number
    name: string
}

interface BooleanConditions {
    question_description: string
    value: boolean
}

interface ValueConditions {
    question_desc: string
    operator: string
    num: number
}

export default function ViewRewardsComp() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    console.log(id)

    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [checkedItems, setCheckedItems] = useState<string[]>([])
    const [rewardCheckedItems, setRewardCheckedItems] = useState<string[]>([])
    const [conditionFields, setConditionFields] = useState<Condition[]>([
        { condition: "" }
    ])
    const [freebieFields, setFreebieFields] = useState<Freebie[]>([
        { quantity: 0, name: "" }
    ])
    const [booleanFields, setBooleanFields] = useState<BooleanConditions[]>([
        { question_description: "", value: false }
    ])
    const [valueFields, setValueFields] = useState<ValueConditions[]>([
        { question_desc: "", operator: "", num: 0 }
    ])
    const [brandData, setBrandData] = useState<any>()
    const [rewardsData, setRewardsData] = useState<Reward[]>([])
    const [tags, setTags] = useState<string[]>([])

    let [selectedRewardType, setSelectedRewardType] = useState("")
    const [pickedRewardType, setPickedRewardType] = useState<string | null>(
        null
    )

    // API ROUTES
    useEffect(() => {
        //fetching rewards
        async function fetchRewardsData() {
            try {
                const response = await fetch(`/api/merchantrewards?id=${id}`)
                if (response.ok) {
                    const data: APIResponse = await response.json()
                    setRewardsData(data.data)
                } else {
                    console.error(
                        "Failed to fetch rewards data:",
                        response.statusText
                    )
                }
            } catch (error) {
                console.error("Error while fetching rewards data:", error)
            }
        }

        //fetching brands
        async function fetchBrandData() {
            try {
                const response = await fetch(
                    `/api/allbrands/selected/?id=${id}`
                )
                if (response.ok) {
                    const data = await response.json()
                    setBrandData(data)
                } else {
                    console.error(
                        "Failed to fetch brand data:",
                        response.statusText
                    )
                }
            } catch (error) {
                console.error("Error while fetching brand data:", error)
            }
        }

        //fetching tags
        async function fetchTags() {
            try {
                const response = await fetch(`/api/tags`)
                if (response.ok) {
                    const data = await response.json()
                    // Assuming 'Objecttags' property exists and is an array
                    setTags(data.tags)
                } else {
                    console.error("Failed to fetch tags:", response.statusText)
                }
            } catch (error) {
                console.error("Error while fetching tags:", error)
            }
        }

        if (id) {
            fetchRewardsData()
            fetchBrandData()
            fetchTags()
        }
    }, [id])

    const [addRewardData, setAddRewardData] = useState({
        reward_name: "",
        reward_desc: "",
        cap: 0,
        reward_type: "",
        discount: 0,
        claim_type: "",
        min_spent: 0,
        min_items: 0,
        expiry: new Date().toISOString().split("T")[0]
    })
    console.log(addRewardData)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setAddRewardData((prev) => ({ ...prev, [name]: value }))
        console.log(addRewardData)
    }

    function handleAddReward() {
        const postData = {
            reward_name: addRewardData.reward_name,
            reward_desc: addRewardData.reward_desc,
            conditions_desc:
                conditionFields.length === 1 &&
                conditionFields[0].condition === ""
                    ? []
                    : conditionFields.map((field) => field.condition),
            allowed_branches: checkedItems,
            cap: addRewardData.cap,
            reward_type: addRewardData.reward_type,
            discount:
                addRewardData.discount === 0 ? null : addRewardData.discount,
            freebies:
                freebieFields.length === 1 &&
                freebieFields[0].quantity === 0 &&
                freebieFields[0].name === ""
                    ? []
                    : freebieFields.map((field) => ({
                          name: field.name,
                          qty: field.quantity
                      })),
            claim_type: addRewardData.claim_type,
            boolean_conditions:
                booleanFields.length === 1 &&
                booleanFields[0].question_description === "" &&
                booleanFields[0].value === false
                    ? []
                    : booleanFields.map((field) => ({
                          question_description: field.question_description,
                          value: field.value
                      })),
            value_conditions:
                valueFields.length === 1 &&
                valueFields[0].question_desc === "" &&
                valueFields[0].operator === "" &&
                valueFields[0].num === 0
                    ? []
                    : valueFields.map((field) => ({
                          question_description: field.question_desc,
                          operator: field.operator,
                          value: field.num
                      })),
            min_spent: addRewardData.min_spent,
            min_items: addRewardData.min_items,
            expiry: addRewardData.expiry,
            reward_tags: rewardCheckedItems
        }
        console.log(postData)

        fetch(`/api/reward/create?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then((response) => {
                if (response.ok) {
                    // Brand added successfully, close the modal or perform any other actions
                    closeModal()
                } else {
                    // Handle errors if any
                    console.error("Failed to add brand:", response.statusText)
                }
            })
            .catch((error) => {
                console.error("Error while adding brand:", error)
            })
    }

    console.log(brandData)

    // BRANCHES DROPDOWN CHECKBOX
    function handleCheckboxChange(item: string) {
        setCheckedItems((prevState) => {
            if (prevState.includes(item)) {
                console.log(`Unchecked:  ${item}`)
                return prevState.filter((checkedItem) => checkedItem !== item)
            } else {
                console.log(`Checked:   ${item}`)
                return [...prevState, item]
            }
        })
    }
    console.log(checkedItems)

    // REWARD TAGS DROPDOWN CHECKBOX
    function handleRewardCheckboxChange(item: string) {
        setRewardCheckedItems((prevState) => {
            if (prevState.includes(item)) {
                console.log(`Unchecked:  ${item}`)
                return prevState.filter((checkedItem) => checkedItem !== item)
            } else {
                console.log(`Checked:   ${item}`)
                return [...prevState, item]
            }
        })
    }
    console.log(rewardCheckedItems)

    // CONDITION DESCRIPTION HANDLE CHANGES
    const handleConditionChange = (index: any, event: any) => {
        let data = [...conditionFields]
        data[index][event.target.name as keyof Condition] = event.target.value
        setConditionFields(data)
    }
    const handleAddConditions = () => {
        setConditionFields([...conditionFields, { condition: "" }])
    }
    const handleRemoveConditions = (index: any) => {
        const values = [...conditionFields]
        values.splice(index, 1)
        setConditionFields(values)
    }
    console.log(conditionFields)

    // FREEBIE HANDLE CHANGES
    const handleFreebieChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target
        const data = [...freebieFields]
        data[index] = {
            ...data[index],
            [name as keyof Freebie]: value
        }
        setFreebieFields(data)
    }
    const handleAddFreebies = () => {
        setFreebieFields([...freebieFields, { quantity: 0, name: "" }])
    }
    const handleRemoveFreebies = (index: any) => {
        const values = [...freebieFields]
        values.splice(index, 1)
        setFreebieFields(values)
    }
    console.log(freebieFields)

    //BOOLEAN CONDITIONS HANDLE CHANGES
    const handleRemoveBoolean = (indexToRemove: number) => {
        setBooleanFields((prevFields) =>
            prevFields.filter((_, index) => index !== indexToRemove)
        )
    }
    const handleAddBoolean = () => {
        setBooleanFields((prevFields) => [
            ...prevFields,
            { question_description: "", value: false }
        ])
    }
    const handleSwitchChange = (index: number, newValue: boolean) => {
        setBooleanFields((prevFields) =>
            prevFields.map((field, idx) =>
                idx === index ? { ...field, value: newValue } : field
            )
        )
    }
    console.log(booleanFields)

    //VALUE CONDITIONS HANDLE CHANGES
    const handleValueChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement> | string
    ) => {
        const data = [...valueFields]
        if (typeof event === "string") {
            data[index] = {
                ...data[index],
                operator: event
            }
        } else {
            const { name, value } = event.target
            data[index] = {
                ...data[index],
                [name]: value
            }
        }
        setValueFields(data)
    }
    const handleAddValue = () => {
        setValueFields([
            ...valueFields,
            { question_desc: "", operator: "", num: 0 }
        ])
    }
    const handleRemoveValue = (index: any) => {
        const values = [...valueFields]
        values.splice(index, 1)
        setValueFields(values)
    }
    console.log(valueFields)

    console.log(rewardsData)

    const { data } = brandData || {}

    function scrollToSection(sectionId: string) {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        } else {
            console.error("Section not found with id:", sectionId)
        }
    }

    const topRef = useRef<HTMLDivElement>(null);

    function scrollToTop() {
        if (topRef && topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const [searchTerm, setSearchTerm] = useState<string>("")
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const filteredRewards = rewardsData.filter(reward =>
        reward.reward_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const [sortedBy, setSortedBy] = useState<string>("")

    const handleSortBy = (sortBy: string) => {
        setSortedBy(sortBy);

        let sortedRewards = [...rewardsData]; // Copy the original rewards data

        if (sortBy === "Expiry Date") {
            sortedRewards.sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());
        } else if (sortBy === "Capacity") {
            sortedRewards.sort((a, b) => b.cap - a.cap);
        }

        setRewardsData(sortedRewards); // Update state with sorted data
    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-7 p-20">
            {brandData && (
                <h1 className="w-full px-10 text-4xl font-bold text-center">
                    {brandData.data.brand_name}
                </h1>
            )}
            <div className="w-full flex flex-row justify-end">
                <div className="flex gap-2">
                    <button
                        className="px-5 gradient-button shadow-lg"
                        onClick={openModal}
                    >
                        Add a Reward
                    </button>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeModal}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-[700px] h-[80vh] transform overflow-y-auto rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                                            <div className="w-full flex flex-col">
                                                <section
                                                    id="section1"
                                                    className="w-full h-screen flex justify-start items-center flex-col gap-4"
                                                >
                                                    <div className="w-full">
                                                        <Dialog.Title
                                                            as="h1"
                                                            className="text-3xl font-bold leading-6 text-gray-900"
                                                        >
                                                            Add a Reward
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                Fill out the
                                                                form below to
                                                                add a new
                                                                reward:
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full mt-2 justify-center items-center text-center">
                                                        <input
                                                            type="text"
                                                            className="w-full input-style"
                                                            name="reward_name"
                                                            placeholder="Reward name"
                                                            value={
                                                                addRewardData.reward_name
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>

                                                    <div className="w-full justify-center items-center text-center">
                                                        <textarea
                                                            className="w-full input-style"
                                                            name="reward_desc"
                                                            placeholder="Reward Description"
                                                            value={
                                                                addRewardData.reward_desc
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>

                                                    <div className="w-full justify-center items-center text-center">
                                                        <Menu
                                                            as="div"
                                                            className="w-full relative inline-block text-left"
                                                        >
                                                            <div>
                                                                <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                    Select
                                                                    Assigned
                                                                    Branch:
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                                        />
                                                                    </svg>
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="ease-out duration-100"
                                                                enterFrom="opacity-0 scale-95"
                                                                enterTo="opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                    <div className="px-1 py-1 overflow-auto h-24">
                                                                        {data &&
                                                                            data.branches &&
                                                                            data.branches.map(
                                                                                (
                                                                                    branch: {
                                                                                        branch_name: string
                                                                                    },
                                                                                    index: number
                                                                                ) => (
                                                                                    <Menu.Item
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        {({
                                                                                            active
                                                                                        }) => (
                                                                                            <div
                                                                                                className={`${
                                                                                                    active
                                                                                                        ? "bg-violet-500 text-white"
                                                                                                        : "text-gray-900"
                                                                                                } overflow-auto group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                            >
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    value={
                                                                                                        branch.branch_name
                                                                                                    }
                                                                                                    checked={checkedItems.includes(
                                                                                                        branch.branch_name
                                                                                                    )}
                                                                                                    onChange={() =>
                                                                                                        handleCheckboxChange(
                                                                                                            branch.branch_name
                                                                                                        )
                                                                                                    }
                                                                                                    onClick={(
                                                                                                        event
                                                                                                    ) =>
                                                                                                        event.stopPropagation()
                                                                                                    }
                                                                                                    className="input-style w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                                                                />
                                                                                                <strong className="px-1">
                                                                                                    {
                                                                                                        branch.branch_name
                                                                                                    }
                                                                                                </strong>
                                                                                            </div>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>

                                                    <div className="w-full justify-center items-center text-center">
                                                        <input
                                                            type="number"
                                                            className="w-full input-style"
                                                            placeholder={addRewardData.cap === 0 ? "Capacity" : ""}
                                                            name="cap"
                                                            value={
                                                                addRewardData.cap === 0 ? "" : addRewardData.cap
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>

                                                    <div className="w-full flex flex-row justify-center items-center text-center gap-2">
                                                        <Menu
                                                            as="div"
                                                            className="w-full relative inline-block text-left"
                                                        >
                                                            <div>
                                                                <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                    {pickedRewardType
                                                                        ? pickedRewardType
                                                                        : "Select Reward Type:"}
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                                        />
                                                                    </svg>
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                    <div className="px-1 py-1 ">
                                                                        {[
                                                                            "DISCOUNT",
                                                                            "FREEBIE"
                                                                        ].map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <Menu.Item
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {({
                                                                                        active
                                                                                    }) => (
                                                                                        <button
                                                                                            className={`${
                                                                                                active
                                                                                                    ? "bg-violet-500 text-white"
                                                                                                    : "text-gray-900"
                                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                            name="reward_type"
                                                                                            value={
                                                                                                item
                                                                                            }
                                                                                            onClick={() => {
                                                                                                setAddRewardData(
                                                                                                    (
                                                                                                        prev
                                                                                                    ) => ({
                                                                                                        ...prev,
                                                                                                        reward_type:
                                                                                                            item
                                                                                                    })
                                                                                                )
                                                                                                setSelectedRewardType(
                                                                                                    item
                                                                                                )
                                                                                                setPickedRewardType(
                                                                                                    item
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <strong className="px-1">
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </strong>
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>

                                                    {/* **IF DISCOUNT IS SELECTED** */}
                                                    {selectedRewardType ===
                                                        "DISCOUNT" && (
                                                        <div className="w-full justify-center items-center text-center">
                                                            <input
                                                                type="number"
                                                                className="w-full input-style"
                                                                placeholder="Discount"
                                                                name="discount"
                                                                value={
                                                                    addRewardData.discount
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    {/* **IF FREEBIE IS SELECTED** */}
                                                    {selectedRewardType ===
                                                        "FREEBIE" && (
                                                        <div className="w-full justify-center items-center text-center">
                                                            {freebieFields.map(
                                                                (
                                                                    input,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex flex-row gap-2"
                                                                        >
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleRemoveFreebies(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <CgRemove />
                                                                            </button>
                                                                            <input
                                                                                name="quantity"
                                                                                className="w-full input-style"
                                                                                placeholder="Quantity"
                                                                                value={
                                                                                    input.quantity
                                                                                }
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    handleFreebieChange(
                                                                                        index,
                                                                                        event
                                                                                    )
                                                                                }
                                                                            />
                                                                            <input
                                                                                name="name"
                                                                                className="w-full input-style"
                                                                                placeholder="Name"
                                                                                value={
                                                                                    input.name
                                                                                }
                                                                                onChange={(
                                                                                    event
                                                                                ) =>
                                                                                    handleFreebieChange(
                                                                                        index,
                                                                                        event
                                                                                    )
                                                                                }
                                                                            />
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleAddFreebies()
                                                                                }
                                                                            >
                                                                                <CgAdd />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="w-full justify-center items-center text-center">
                                                        <Menu
                                                            as="div"
                                                            className="w-full relative inline-block text-left"
                                                        >
                                                            <div>
                                                                <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                    Select Claim
                                                                    Type:
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                                        />
                                                                    </svg>
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                    <div className="px-1 py-1 ">
                                                                        {[
                                                                            "PURCHASE_VALUE",
                                                                            "ITEM_QTY",
                                                                            "CUSTOM"
                                                                        ].map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <Menu.Item
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {({
                                                                                        active
                                                                                    }) => (
                                                                                        <button
                                                                                            className={`${
                                                                                                active
                                                                                                    ? "bg-violet-500 text-white"
                                                                                                    : "text-gray-900"
                                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                            name="claim_type"
                                                                                            value={
                                                                                                item
                                                                                            }
                                                                                            onClick={() => {
                                                                                                setAddRewardData(
                                                                                                    (
                                                                                                        prev
                                                                                                    ) => ({
                                                                                                        ...prev,
                                                                                                        claim_type:
                                                                                                            item
                                                                                                    })
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <strong className="px-1">
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </strong>
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>
                                                    <div className="w-full mt-5">
                                                        <button 
                                                            className="bg-dark-pink px-4 py-2 rounded-md text-white font-bold" 
                                                            onClick={() =>
                                                                scrollToSection(
                                                                    "section2"
                                                                )
                                                        }>
                                                            Next
                                                        </button>
                                                    </div>
                                                </section>
                                                <section
                                                    id="section2"
                                                    className="w-full h-screen flex flex-col items-center justify-start pt-10"
                                                >
                                                    {/* CONDITION DESCRIPTION */}
                                                    <div className="w-full justify-center items-center text-center">
                                                        <div className="">
                                                            <p className="flex justify-center text-sm text-gray-500">
                                                                Condition
                                                                Description
                                                            </p>
                                                        </div>
                                                        {conditionFields.map(
                                                            (input, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex flex-row justify-center items-center mt-2 gap-2"
                                                                    >
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveConditions(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <CgRemove />
                                                                        </button>
                                                                        <input
                                                                            name="condition"
                                                                            className="w-full input-style"
                                                                            placeholder="Condition"
                                                                            value={
                                                                                input.condition
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleConditionChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <button
                                                                            onClick={() =>
                                                                                handleAddConditions()
                                                                            }
                                                                        >
                                                                            <CgAdd />
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                    </div>

                                                    {/* BOOLEAN CONDITIONS */}
                                                    <div className="w-full mt-5 justify-center items-center text-center">
                                                        <div className="mt-2">
                                                            <p className="flex justify-center text-sm text-gray-500">
                                                                Boolean
                                                                Conditions
                                                            </p>
                                                        </div>
                                                        {booleanFields.map(
                                                            (input, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="w-full flex flex-row mt-2 gap-2"
                                                                    >
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveBoolean(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <CgRemove />
                                                                        </button>
                                                                        <input
                                                                            name="question_description"
                                                                            className="w-full input-style"
                                                                            placeholder="Question"
                                                                            value={
                                                                                input.question_description
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const newValue =
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                setBooleanFields(
                                                                                    (
                                                                                        prevFields
                                                                                    ) =>
                                                                                        prevFields.map(
                                                                                            (
                                                                                                field,
                                                                                                idx
                                                                                            ) =>
                                                                                                idx ===
                                                                                                index
                                                                                                    ? {
                                                                                                          ...field,
                                                                                                          question_description:
                                                                                                              newValue
                                                                                                      }
                                                                                                    : field
                                                                                        )
                                                                                )
                                                                            }}
                                                                        />
                                                                        <div className="flex justify-center items-center">
                                                                            {/* where switch button will be */}
                                                                            <Switch
                                                                                checked={
                                                                                    input.value
                                                                                }
                                                                                onChange={(
                                                                                    setEnabled
                                                                                ) =>
                                                                                    handleSwitchChange(
                                                                                        index,
                                                                                        setEnabled
                                                                                    )
                                                                                }
                                                                                className={`${
                                                                                    input.value
                                                                                        ? "bg-teal-900"
                                                                                        : "bg-teal-700"
                                                                                }
                                                                                relative inline-flex h-[29px] w-[53px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                                                            >
                                                                                <span className="sr-only">
                                                                                    Use
                                                                                    setting
                                                                                </span>
                                                                                <span
                                                                                    aria-hidden="true"
                                                                                    className={`${
                                                                                        input.value
                                                                                            ? "translate-x-6"
                                                                                            : "translate-x-0"
                                                                                    }
                                                                                    pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                                />
                                                                            </Switch>
                                                                        </div>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleAddBoolean()
                                                                            }
                                                                        >
                                                                            <CgAdd />
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                    </div>

                                                    {/* VALUE CONDITIONS */}
                                                    <div className="w-full mt-5 justify-center items-center text-center">
                                                        <div className="mt-2">
                                                            <p className="flex justify-center text-sm text-gray-500">
                                                                Value Conditions
                                                            </p>
                                                        </div>
                                                        {valueFields.map(
                                                            (input, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex flex-row mt-2 gap-4"
                                                                    >
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveValue(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <CgRemove />
                                                                        </button>
                                                                        <input
                                                                            name="question_desc"
                                                                            className="w-full input-style"
                                                                            placeholder="Provide a question"
                                                                            value={
                                                                                input.question_desc
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleValueChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <div>
                                                                            <Menu
                                                                                as="div"
                                                                                className="w-full relative inline-block text-left"
                                                                            >
                                                                                <div>
                                                                                    <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                                        {input.operator
                                                                                            ? input.operator
                                                                                            : "Select Operator:"}
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            fill="none"
                                                                                            viewBox="0 0 24 24"
                                                                                            strokeWidth="1.5"
                                                                                            stroke="currentColor"
                                                                                            className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100"
                                                                                        >
                                                                                            <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                                                            />
                                                                                        </svg>
                                                                                    </Menu.Button>
                                                                                </div>
                                                                                <Transition
                                                                                    as={
                                                                                        Fragment
                                                                                    }
                                                                                    enter="transition ease-out duration-100"
                                                                                    enterFrom="transform opacity-0 scale-95"
                                                                                    enterTo="transform opacity-100 scale-100"
                                                                                    leave="transition ease-in duration-75"
                                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                                    leaveTo="transform opacity-0 scale-95"
                                                                                >
                                                                                    <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                                        <div className="px-1 py-1 ">
                                                                                            {[
                                                                                                "<",
                                                                                                "<=",
                                                                                                "=",
                                                                                                ">=",
                                                                                                ">"
                                                                                            ].map(
                                                                                                (
                                                                                                    item,
                                                                                                    operatorindex
                                                                                                ) => (
                                                                                                    <Menu.Item
                                                                                                        key={
                                                                                                            operatorindex
                                                                                                        }
                                                                                                    >
                                                                                                        {({
                                                                                                            active
                                                                                                        }) => (
                                                                                                            <button
                                                                                                                className={`${
                                                                                                                    active
                                                                                                                        ? "bg-violet-500 text-white"
                                                                                                                        : "text-gray-900"
                                                                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                                                name="operator"
                                                                                                                onClick={() => {
                                                                                                                    // setSelectedOperator(item)
                                                                                                                    handleValueChange(
                                                                                                                        index,
                                                                                                                        item
                                                                                                                    )
                                                                                                                }}
                                                                                                            >
                                                                                                                <strong className="px-1">
                                                                                                                    {
                                                                                                                        item
                                                                                                                    }
                                                                                                                </strong>
                                                                                                            </button>
                                                                                                        )}
                                                                                                    </Menu.Item>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    </Menu.Items>
                                                                                </Transition>
                                                                            </Menu>
                                                                        </div>
                                                                        <input
                                                                            name="num"
                                                                            className="w-full input-style"
                                                                            placeholder={input.num === 0 ? "Rule Value" : ""}
                                                                            value={
                                                                                input.num === 0 ? "" : input.num
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleValueChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <button
                                                                            onClick={() =>
                                                                                handleAddValue()
                                                                            }
                                                                        >
                                                                            <CgAdd />
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                    </div>
                                                    <div className="w-full flex gap-2 mt-8">
                                                        <button
                                                            className="bg-dark-pink px-4 py-2 rounded-md text-white font-bold"
                                                            onClick={() =>
                                                                scrollToSection(
                                                                    "section3"
                                                                )
                                                            }
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </section>
                                                <section
                                                    id="section3"
                                                    className="w-full h-screen flex flex-col justify-start items-center pt-12 gap-4"
                                                >
                                                    {/* MINIMUM SPENT */}
                                                    <div className="w-full justify-center items-center text-center">
                                                        <input
                                                            type="number"
                                                            className="w-full input-style"
                                                            placeholder={addRewardData.min_spent === 0 ? "Minimum Spent" : ""}
                                                            name="min_spent"
                                                            value={
                                                                addRewardData.min_spent === 0 ? "" : addRewardData.min_spent
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                    {/* MINIMUM ITEMS */}
                                                    <div className="w-full justify-center items-center text-center">
                                                        <input
                                                            type="number"
                                                            className="w-full input-style"
                                                            placeholder={addRewardData.min_items === 0 ? "Minimum Items" : ""}
                                                            name="min_items"
                                                            value={
                                                                addRewardData.min_items === 0 ? "" : addRewardData.min_items
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                    {/* EXPIRY */}
                                                    <div className="w-full justify-center items-center text-center">
                                                        <input
                                                            type="date"
                                                            className="w-full input-style"
                                                            placeholder="Expiry Date"
                                                            name="expiry"
                                                            value={
                                                                addRewardData.expiry
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                    {/* REWARD TAGS */}
                                                    <div className="w-full justify-center items-center text-center">
                                                        <Menu
                                                            as="div"
                                                            className="w-full relative inline-block text-left"
                                                        >
                                                            <div>
                                                                <Menu.Button className="input-style inline-flex flex items-center w-full justify-between rounded-md p-2 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                                                    Select
                                                                    reward tags
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="1.5"
                                                                        stroke="currentColor"
                                                                        className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                                        />
                                                                    </svg>
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                                    {tags.length >
                                                                        0 && (
                                                                        <div className="overflow-auto px-1 py-1 w-full h-40">
                                                                            {tags.map(
                                                                                (
                                                                                    item,
                                                                                    index
                                                                                ) => (
                                                                                    <Menu.Item
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        {({
                                                                                            active
                                                                                        }) => (
                                                                                            <div
                                                                                                className={`${
                                                                                                    active
                                                                                                        ? "bg-violet-500 text-white"
                                                                                                        : "text-gray-900"
                                                                                                } overflow-auto group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                                            >
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    value={
                                                                                                        item
                                                                                                    }
                                                                                                    checked={rewardCheckedItems.includes(
                                                                                                        item
                                                                                                    )}
                                                                                                    onChange={() =>
                                                                                                        handleRewardCheckboxChange(
                                                                                                            item
                                                                                                        )
                                                                                                    }
                                                                                                    onClick={(
                                                                                                        event
                                                                                                    ) =>
                                                                                                        event.stopPropagation()
                                                                                                    }
                                                                                                    className="input-style w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                                                                />
                                                                                                <strong className="px-1">
                                                                                                    {
                                                                                                        item
                                                                                                    }
                                                                                                </strong>
                                                                                            </div>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>
                                                    <div className="mt-6 p-1 text-center">
                                                        <button
                                                            type="button"
                                                            className="w-80 gradient-button"
                                                            //className='w-80 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                                            onClick={
                                                                handleAddReward
                                                            }
                                                        >
                                                            Save and Proceed
                                                        </button>
                                                    </div>
                                                </section>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                </div>
            </div>
            <div className="w-full flex flex-row justify-end">
                <div className="flex gap-2">
                    <div className="w-full flex items-center">
                        <Menu as="div" className="w-full relative inline-block text-left">
                            <div>
                                <Menu.Button className="input-style inline-flex flex justify-center items-center w-full justify-between border-dark-pink rounded-lg p-3 text-sm hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    Sort by:
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-1 ml-2 h-6 w-5 text-violet-200 hover:text-violet-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-40 right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        {["Expiry Date", "Capacity"].map((item, index) => (
                                            <Menu.Item key={index}>
                                                {({ active }) => (
                                                <button
                                                    className={`${
                                                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    onClick={() => handleSortBy(item)}
                                                >
                                                    <strong className='px-1'>{item}</strong>
                                                </button>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    

                    <div className="w-full flex items-center gap-2 p-3 border-2 rounded-lg border-dark-pink bg-white drop-shadow-lg">
                        <IoSearch className="text-dark-pink" />
                        <input
                            type="text"
                            className="appearance-none focus:outline-none grow text-sm"
                            placeholder="Search a reward..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-md border-b-2 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Reward name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Expiry Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Capacity
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRewards.length > 0 ? (
                        filteredRewards.map((reward) => (
                            <tr
                                key={reward._id}
                                className="odd:bg-white even:bg-gray-50 border-b"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {reward.reward_name}
                                </th>
                                <td className="px-6 py-4 text-center">
                                    {new Date(
                                        reward.expiry
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {reward.cap}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-yellow-100 text-yellow-800 font-medium px-5 py-1.5 rounded-full">
                                        {reward.status ? "Ongoing" : "Expired"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={4}
                                className="py-16 text-center text-xl font-semibold"
                            >
                                No rewards yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
